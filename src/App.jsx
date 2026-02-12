import '@arcgis/core/assets/esri/themes/light/main.css';
import Graphic from '@arcgis/core/Graphic';
import { identify } from '@arcgis/core/rest/identify';
import IdentifyParameters from '@arcgis/core/rest/support/IdentifyParameters';
import { faHandPointer, faList } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './App.scss';
import About from './components/About/About';
import MapView from './components/esrijs/MapView';
import Filter from './components/Filter/Filter';
import QueryFilter from './components/Filter/QueryFilter';
import { getLayersInMap } from './components/Filter/utils';
import Header from './components/Header/Header';
import MapLens from './components/MapLens/MapLens';
import MapWidget from './components/MapWidget/MapWidget';
import ProjectInformation from './components/ProjectInformation/ProjectInformation';
import { MapServiceProvider, Sherlock } from './components/Sherlock/Sherlock';
import Sidebar from './components/Sidebar/Sidebar';
import config, { useCurrentTabConfig } from './config';
import { useSpecialTranslation } from './i18n';
import { ACTION_TYPES, URLParamsContext } from './URLParams';

export default function App() {
  console.log('app render');
  const [zoomToGraphic, setZoomToGraphic] = React.useState({
    graphic: null,
    level: 0,
  });
  const [mapView, setView] = React.useState();
  const [resetFilter, setResetFilter] = React.useState(false);
  const [selectedGraphics, setSelectedGraphics] = React.useState([]);
  const [showIdentifyLoader, setShowIdentifyLoader] = React.useState(false);
  const [graphic, setGraphic] = React.useState(null);
  const [highlight, setHighlight] = React.useState(null);
  const currentTabConfig = useCurrentTabConfig();
  const [urlParams, dispatchURLParams] = React.useContext(URLParamsContext);
  const t = useSpecialTranslation();

  const quadWord = import.meta.env.VITE_DISCOVER;

  const onMapClick = React.useCallback(async (clickEvent, view) => {
    console.log('onMapClick', clickEvent);

    setSelectedGraphics([]);

    let finished = false;

    setTimeout(() => {
      if (!finished) {
        setShowIdentifyLoader(true);
      }
    }, config.LOADER_DELAY);

    const layers = view.map.layers;

    const mapImageLayers = layers.filter(
      (layer) =>
        layer.type === 'map-image' &&
        layer.visible &&
        !config.projectInformation.excludedLayers.includes(layer.title),
    );

    const identifyPromises = mapImageLayers.map((layer) => {
      const layerIds = layer.sublayers
        .filter((subLayer) => subLayer.visible)
        .map((subLayer) => subLayer.id)
        .toArray();

      if (layerIds.length === 0) {
        return new Promise((resolve) => resolve({ results: [] }));
      }

      const parameters = new IdentifyParameters({
        geometry: clickEvent.mapPoint,
        height: view.height,
        layerIds,
        layerOption: 'visible',
        mapExtent: view.extent,
        returnFieldName: true,
        returnGeometry: true,
        tolerance: config.IDENTIFY_PIXEL_TOLERANCE,
        width: view.width,
      });

      return identify(layer.url, parameters);
    });
    console.log('identifyPromises', identifyPromises);

    const identifyResponses = await Promise.all(identifyPromises.toArray());

    const layerNameLookup = await getLayersInMap(view.map);
    const identifyFeatures = identifyResponses.reduce((previous, current) => {
      return previous.concat(
        current.results.map((result) => {
          return {
            mapView: view,
            geometry: result.feature.geometry,
            attributes: result.feature.attributes,
            popupTemplate: layerNameLookup[result.layerName].popupTemplate,
          };
        }),
      );
    }, []);

    const response = await view.hitTest(clickEvent);
    const queryFeatures = await Promise.all(
      response.results
        .filter(
          (hitResult) =>
            !config.projectInformation.excludedLayers.includes(
              hitResult.graphic.layer.title,
            ) && hitResult.graphic.layer.queryFeatures,
        )
        .map(async (hitResult) => {
          const results = await hitResult.graphic.layer.queryFeatures({
            objectIds: [
              hitResult.graphic.attributes[
                hitResult.graphic.layer.objectIdField
              ],
            ],
            returnGeometry: true,
            outFields: '*',
          });

          const feature = results.features[0].clone();
          // tack on the map view because we need it in the details component
          feature.mapView = view;

          return feature;
        }),
    );
    const newSelectedGraphics = queryFeatures.concat(identifyFeatures);

    finished = true;

    setSelectedGraphics(newSelectedGraphics);
    setShowIdentifyLoader(false);
  }, []);

  const mapOptions = {
    discoverKey: quadWord,
    zoomToGraphic: zoomToGraphic,
    onClick: onMapClick,
    setView,
    mapView,
    initialExtent: React.useMemo(() => {
      return urlParams.scale
        ? {
            x: urlParams.x,
            y: urlParams.y,
            scale: urlParams.scale,
          }
        : null;
    }, [urlParams]),
  };

  const toggleSidebar = () => {
    console.log('App:toggleSidebar');

    dispatchURLParams({ type: ACTION_TYPES.TOGGLE_SIDE_BAR });
  };

  const sidebarOptions = {
    sideBarOpen: !urlParams.sideBarClosed,
    toggleSidebar,
  };

  const onSherlockMatch = (graphics) => {
    // summary:
    //      Zooms to the passed in graphic(s).
    // graphics: esri.Graphic[]
    //      The esri.Graphic(s) that you want to zoom to.
    // tags:
    //      private
    console.log('App:onSherlockMatch');

    setZoomToGraphic({
      graphic: graphics,
      preserve: false,
    });
  };

  const sherlockConfig = {
    provider: new MapServiceProvider(
      config.sherlock.serviceUrl,
      config.sherlock.searchField,
    ),
    placeHolder: t(config.sherlock.placeHolder),
    label: t(config.sherlock.placeHolder),
    onSherlockMatch,
  };

  React.useEffect(() => {
    console.log('toggleFilter');

    if (resetFilter) {
      setResetFilter(false);
    }
  }, [resetFilter]);

  const highlightGraphic = async (newGraphic) => {
    console.log('App:highlightGraphic', newGraphic);

    if (highlight) {
      highlight.remove();
      setHighlight(null);
    }

    if (graphic) {
      mapView.graphics.remove(graphic);
    }

    if (newGraphic) {
      try {
        const layerView = await mapView.whenLayerView(newGraphic.layer);
        setHighlight(layerView.highlight(newGraphic));
      } catch {
        const symbolizedGraphic = new Graphic({
          ...newGraphic,
          symbol: config.SELECTION_SYMBOLS[newGraphic.geometry.type],
        });

        mapView.graphics.add(symbolizedGraphic);
        setGraphic(symbolizedGraphic);
      }
    } else {
      setGraphic(null);
    }
  };

  React.useEffect(() => {
    // reset graphics on tab change
    setSelectedGraphics([]);
  }, [currentTabConfig, setSelectedGraphics]);

  return (
    <div className="app">
      {currentTabConfig && (
        <>
          <Header title={t('trans:appTitle')} />
          <Sidebar
            toggleSidebar={toggleSidebar}
            isOpen={!urlParams.sideBarClosed}
          >
            <About version={import.meta.env.PACKAGE_VERSION} />
          </Sidebar>
          <MapLens {...sidebarOptions}>
            <MapView {...mapOptions} />
            {currentTabConfig.filter && (
              <MapWidget
                defaultOpen={config.openOnLoad.filter}
                name={
                  currentTabConfig.filter?.name
                    ? t(currentTabConfig.filter.name)
                    : t('trans:filter')
                }
                icon={faList}
                position={0}
                showReset={true}
                onReset={() => setResetFilter(true)}
                mapView={mapView}
              >
                <Filter
                  {...currentTabConfig.filter}
                  reset={resetFilter}
                  mapView={mapView}
                  webMapId={currentTabConfig.webMapId}
                />
              </MapWidget>
            )}
            {currentTabConfig.queryFilter && (
              <MapWidget
                defaultOpen={config.openOnLoad.queryFilter}
                name={
                  currentTabConfig.filter?.name
                    ? t(currentTabConfig.filter.name)
                    : `${t(currentTabConfig.name)} ${t('trans:filter')}`
                }
                icon={faList}
                position={0}
                showReset={true}
                onReset={() => setResetFilter(true)}
                mapView={mapView}
              >
                <QueryFilter
                  {...currentTabConfig.queryFilter}
                  reset={resetFilter}
                  mapView={mapView}
                  webMapId={currentTabConfig.webMapId}
                />
              </MapWidget>
            )}
            {!currentTabConfig.useDefaultAGOLPopup && (
              <MapWidget
                defaultOpen={config.openOnLoad.projectInfo}
                name={
                  currentTabConfig.projectInformation?.name
                    ? t(currentTabConfig?.projectInformation?.name)
                    : t('trans:projectInformation')
                }
                icon={faHandPointer}
                position={1}
                mapView={mapView}
                openOnMapClick
              >
                <ProjectInformation
                  graphics={selectedGraphics}
                  highlightGraphic={highlightGraphic}
                  showLoader={showIdentifyLoader}
                />
              </MapWidget>
            )}
            <Sherlock {...sherlockConfig}></Sherlock>
          </MapLens>
        </>
      )}
    </div>
  );
}
