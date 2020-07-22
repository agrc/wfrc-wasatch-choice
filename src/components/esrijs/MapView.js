import React from 'react';
import ReactDOM from 'react-dom';
import esriModules from '../../esriModules';
import { LayerSelectorContainer, LayerSelector } from '../../components/LayerSelector/LayerSelector';
import config from '../../config';
import { useCurrentTabConfig } from '../../config';
import debounce from 'lodash.debounce';
import { ACTION_TYPES, URLParamsContext } from '../../URLParams';


const ReactMapView = ({ discoverKey, zoomToGraphic, initialExtent, setView, onClick}) => {
  const dispatchURLParams = React.useContext(URLParamsContext)[1];
  const currentTabConfig = useCurrentTabConfig();
  const zoomInLevels = 5;
  const [displayedZoomGraphic, setDisplayedZoomGraphic] = React.useState(null);
  const maps = React.useRef();
  const view = React.useRef();
  const mapViewDiv = React.useRef();
  const defaultPopup = React.useRef();
  const selectorNode = React.useRef();
  const layerSelector = React.useRef();
  const isLayerSelectorVisible = React.useRef(false);

  const zoomTo = React.useCallback(async (zoomObj) => {
    console.log('app.zoomTo');

    if (!Array.isArray(zoomObj.target)) {
      zoomObj.target = [zoomObj.target];
    }

    if (!zoomObj.zoom) {
      if (zoomObj.target.every(graphic => graphic.geometry.type === 'point')) {
        zoomObj = {
          target: zoomObj.target,
          zoom: view.current.map.basemap.baseLayers.items[0].tileInfo.lods.length - zoomInLevels
        };
      } else {
        zoomObj = {
          target: zoomObj.target
        };
      }
    }

    await view.current.goTo(zoomObj);

    if (displayedZoomGraphic) {
      view.current.graphics.removeMany(displayedZoomGraphic);
    }

    setDisplayedZoomGraphic(zoomObj.target);

    view.current.graphics.addMany(zoomObj.target);

    const { watchUtils } = await esriModules();

    if (!zoomObj.preserve) {
      watchUtils.once(view.current, 'extent', () => {
        view.current.graphics.removeAll();
      });
    }
  }, [displayedZoomGraphic]);

  React.useEffect(() => {
    console.log('MapView: zoom to graphic');

    if (zoomToGraphic) {
      const { graphic, level, preserve } = zoomToGraphic;

      graphic && zoomTo({
       target: graphic,
        zoom: level,
        preserve: preserve
      });
    }
  }, [zoomToGraphic, zoomTo]);

  const setUpLayerSelector = React.useCallback(async () => {
    console.log('setUpLayerSelector');
    const modules = await esriModules();

    selectorNode.current = document.createElement('div');

    const layerSelectorOptions = {
      view: view.current,
      quadWord: discoverKey,
      modules,
      ...config.layerSelector
    };

    ReactDOM.render(
      <LayerSelectorContainer>
        <LayerSelector {...layerSelectorOptions} ref={layerSelector} />
      </LayerSelectorContainer>,
      selectorNode.current);
  }, [discoverKey]);

  const changeMap = React.useCallback(async () => {
    console.log('MapView: changeMap', maps.current);

    if (window.Cypress) {
      window.currentMapName = currentTabConfig.name;
      window.mapLoaded = false;
    }

    if (maps.current) {
      if (!maps.current[currentTabConfig.id]) {
        const { WebMap } = await esriModules();
        maps.current[currentTabConfig.id] = new WebMap({
          portalItem: {
            id: currentTabConfig.webMapId
          }
        });
      }

      // update web map
      view.current.map = maps.current[currentTabConfig.id];

      if (!currentTabConfig.useDefaultAGOLPopup) {
        view.current.popup = null;
      } else {
        const { Popup } = await esriModules();
        view.current.popup = new Popup();
      }

      // update layer selector visibility
      if (!currentTabConfig.hideLayerSelector) {
        // init layer selector if needed
        if (!layerSelector.current) {
          await setUpLayerSelector();
        }

        // make sure that layer selector is wired to the new map
        layerSelector.current.forceMapUpdate();
      }

      if (currentTabConfig.hideLayerSelector !== isLayerSelectorVisible.current) {
        const method = (currentTabConfig.hideLayerSelector) ?
          view.current.ui.remove.bind(view.current.ui) : view.current.ui.add.bind(view.current.ui);
        method(selectorNode.current, { position: 'top-left', index: 2 });
      }

      isLayerSelectorVisible.current = currentTabConfig.hideLayerSelector;
    }
  }, [currentTabConfig, setUpLayerSelector]);

  // this looks a little funny...
  // We need to keep change map as a callable function so that it can be called
  // at the end of the initMap function.
  // But we also want it called each time currentTabConfig changes. So we use useCallback
  // on it and then use this useEffect to kick it off.
  React.useEffect(() => {
    changeMap();
  }, [changeMap]);

  React.useEffect(() => {
    const initMap = async () => {
      console.log('MapView:initMap');

      const { MapView, Home } = await esriModules();

      maps.current = {};

      let center;
      let zoom;
      let scale;
      if (initialExtent) {
        center = initialExtent;
        scale = initialExtent.scale;
      } else {
        center = config.defaultExtent;
        zoom = config.defaultExtent.zoomLevel
      }

      view.current = new MapView({
        container: mapViewDiv.current,
        center: {
          ...center,
          spatialReference: 3857
        },
        zoom,
        scale,
        ui: {
          components: ['zoom']
        }
      });

      view.current.ui.add(new Home({ view: view.current}), 'top-left');

      // one time setup once the view has loaded
      view.current.when(() => {
        view.current.watch('extent', debounce(newExtent => {
          if (newExtent) {
            dispatchURLParams({
              type: ACTION_TYPES.MAP_EXTENT,
              payload: {
                x: Math.round(newExtent.center.x),
                y: Math.round(newExtent.center.y),
                scale: Math.round(view.current.scale)
              }
            });
          }
        }, 100));

        view.current.on('click', onClick);

        defaultPopup.current = view.current.popup;
      });

      if (window.Cypress) {
        // help Cypress know when the map has loaded
        view.current.watch('updating', updating => {
          console.log('updating state changed', updating);
          window.mapLoaded = view.current.ready && !updating;
        });

        // these global methods are for cypress integration tests
        window.getMapExtent = () => {
          return JSON.stringify(view.current.extent.toJSON());
        };
        window.getVisibleLayers = () => {
          return view.current.layerViews.items
              .filter(view => view.visible)
              .map(view => view.layer.allSublayers.items
                .filter(subLayer => subLayer.visible)
                .map(subLayer => `${subLayer.title}-${subLayer.definitionExpression}`)
              )
              .flat()
          ;
        };
      }

      setView(view.current);

      changeMap();
    };

    !maps.current && initMap();
  }, [initialExtent, discoverKey, onClick, setView, changeMap, setUpLayerSelector, currentTabConfig, dispatchURLParams]);

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      ref={mapViewDiv}
    />
  );
};

export default ReactMapView;
