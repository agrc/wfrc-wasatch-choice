import { once } from '@arcgis/core/core/reactiveUtils';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Home from '@arcgis/core/widgets/Home';
import Popup from '@arcgis/core/widgets/Popup';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import config, { useCurrentTabConfig } from '../../config';
import { ACTION_TYPES, URLParamsContext } from '../../URLParams';
import {
  LayerSelector,
  LayerSelectorContainer,
} from '../LayerSelector/LayerSelector';

export default function ReactMapView({
  discoverKey,
  zoomToGraphic,
  initialExtent,
  setView,
  mapView,
  onClick,
}) {
  const dispatchURLParams = useContext(URLParamsContext)[1];
  const currentTabConfig = useCurrentTabConfig();
  const zoomInLevels = 5;
  const [displayedZoomGraphic, setDisplayedZoomGraphic] = useState(null);
  const maps = useRef();
  const mapViewDiv = useRef();
  const defaultPopup = useRef();
  const selectorNode = useRef();
  const layerSelector = useRef();
  const isLayerSelectorVisible = useRef(false);

  const zoomTo = useCallback(
    async (zoomObj) => {
      console.log('app.zoomTo');

      if (!Array.isArray(zoomObj.target)) {
        zoomObj.target = [zoomObj.target];
      }

      if (!zoomObj.zoom) {
        if (
          zoomObj.target.every((graphic) => graphic.geometry.type === 'point')
        ) {
          zoomObj = {
            target: zoomObj.target,
            zoom:
              mapView.map.basemap.baseLayers.items[0].tileInfo.lods.length -
              zoomInLevels,
          };
        } else {
          zoomObj = {
            target: zoomObj.target,
          };
        }
      }

      await mapView.goTo(zoomObj);

      if (displayedZoomGraphic) {
        mapView.graphics.removeMany(displayedZoomGraphic);
      }

      setDisplayedZoomGraphic(zoomObj.target);

      mapView.graphics.addMany(zoomObj.target);

      if (!zoomObj.preserve) {
        once(() => mapView.extent).then(() => {
          mapView.graphics.removeAll();
        });
      }
    },
    [displayedZoomGraphic, mapView],
  );

  useEffect(() => {
    console.log('MapView: zoom to graphic');

    if (zoomToGraphic) {
      const { graphic, level, preserve } = zoomToGraphic;

      graphic &&
        zoomTo({
          target: graphic,
          zoom: level,
          preserve: preserve,
        });
    }
  }, [zoomToGraphic, zoomTo]);

  const setUpLayerSelector = useCallback(async () => {
    console.log('setUpLayerSelector');
    selectorNode.current = document.createElement('div');

    const layerSelectorOptions = {
      view: mapView,
      quadWord: discoverKey,
      ...config.layerSelector,
    };

    createRoot(selectorNode.current).render(
      <LayerSelectorContainer>
        <LayerSelector {...layerSelectorOptions} ref={layerSelector} />
      </LayerSelectorContainer>,
    );
  }, [discoverKey, mapView]);

  const changeMap = useCallback(async () => {
    console.log('MapView: changeMap', maps.current);

    if (window.Cypress) {
      window.currentMapName = currentTabConfig.name;
      window.mapLoaded = false;
    }

    if (maps.current && mapView) {
      if (!maps.current[currentTabConfig.id]) {
        maps.current[currentTabConfig.id] = new WebMap({
          portalItem: {
            id: currentTabConfig.webMapId,
          },
        });
      }

      // update web map
      mapView.map = maps.current[currentTabConfig.id];

      if (!currentTabConfig.useDefaultAGOLPopup) {
        mapView.popup = null;
      } else {
        mapView.popup = new Popup();
      }

      // update layer selector visibility
      if (!currentTabConfig.hideLayerSelector) {
        // init layer selector if needed
        if (!layerSelector.current) {
          await setUpLayerSelector();
        }

        // make sure that layer selector is wired to the new map
        layerSelector.current?.forceMapUpdate();
      }

      if (
        currentTabConfig.hideLayerSelector !== isLayerSelectorVisible.current
      ) {
        const method = currentTabConfig.hideLayerSelector
          ? mapView.ui.remove.bind(mapView.ui)
          : mapView.ui.add.bind(mapView.ui);
        method(selectorNode.current, { position: 'top-left', index: 2 });
      }

      isLayerSelectorVisible.current = currentTabConfig.hideLayerSelector;
    }
  }, [currentTabConfig, setUpLayerSelector, mapView]);

  // this looks a little funny...
  // We need to keep change map as a callable function so that it can be called
  // at the end of the initMap function.
  // But we also want it called each time currentTabConfig changes. So we use useCallback
  // on it and then use this useEffect to kick it off.
  useEffect(() => {
    changeMap();
  }, [changeMap]);

  useEffect(() => {
    const initMap = async () => {
      console.log('MapView:initMap');

      maps.current = {};

      let center;
      let zoom;
      let scale;
      if (initialExtent) {
        center = initialExtent;
        scale = initialExtent.scale;
      } else {
        center = config.defaultExtent;
        zoom = config.defaultExtent.zoomLevel;
      }

      const view = new MapView({
        container: mapViewDiv.current,
        center: {
          ...center,
          spatialReference: 3857,
        },
        zoom,
        scale,
        ui: {
          components: ['zoom'],
        },
      });

      view.ui.add(new Home({ view }), 'top-left');

      // one time setup once the view has loaded
      view.when(() => {
        view.watch(
          'extent',
          debounce((newExtent) => {
            if (newExtent) {
              dispatchURLParams({
                type: ACTION_TYPES.MAP_EXTENT,
                payload: {
                  x: Math.round(newExtent.center.x),
                  y: Math.round(newExtent.center.y),
                  scale: Math.round(view.scale),
                },
              });
            }
          }, 100),
        );

        view.on('click', (event) => onClick(event, view));

        defaultPopup.current = view.popup;
      });

      if (window.Cypress) {
        // help Cypress know when the map has loaded
        view.watch(['updating', 'navigating'], (updating) => {
          window.mapLoaded = view.ready && !updating && !view.navigating;
        });

        // these global methods are for cypress integration tests
        window.getMapExtent = () => {
          return JSON.stringify(view.extent.toJSON());
        };

        window.getVisibleLayers = () => {
          return view.layerViews.items
            .filter((layerView) => layerView.visible)
            .map((layerView) => {
              if (layerView.layer.allSublayers) {
                return layerView.layer.allSublayers.items
                  .filter((subLayer) => subLayer.visible)
                  .map(
                    (subLayer) =>
                      `${subLayer.title}-${subLayer.definitionExpression}`,
                  );
              } else {
                return `${layerView.layer.title}-${layerView.layer.definitionExpression}`;
              }
            })
            .flat();
        };
      }

      setView(view);

      changeMap();
    };

    !maps.current && initMap();
  }, [
    initialExtent,
    discoverKey,
    onClick,
    setView,
    changeMap,
    setUpLayerSelector,
    currentTabConfig,
    dispatchURLParams,
  ]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapViewDiv} />;
}

ReactMapView.propTypes = {
  discoverKey: PropTypes.string.isRequired,
  zoomToGraphic: PropTypes.object,
  initialExtent: PropTypes.object,
  setView: PropTypes.func.isRequired,
  mapView: PropTypes.object,
  onClick: PropTypes.func,
};
