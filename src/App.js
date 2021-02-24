import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapLens from './components/MapLens';
import MapView from './components/esrijs/MapView';
import config, { useCurrentTabConfig } from './config';
import './App.scss';
import About from './components/About/About';
import MapWidget from './components/MapWidget/MapWidget';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Sherlock, MapServiceProvider } from './components/Sherlock';
import Filter from './components/Filter/Filter';
import QueryFilter from './components/Filter/QueryFilter';
import { getLayersInMap } from './components/Filter/utils';
import ProjectInformation from './components/ProjectInformation/ProjectInformation';
import esriModules from './esriModules';
import { URLParamsContext, ACTION_TYPES } from './URLParams';
import { useSpecialTranslation } from './i18n';
import 'react-perfect-scrollbar/dist/css/styles.css';


const App = () => {
  console.log('app render');
  const [zoomToGraphic, setZoomToGraphic] = React.useState({
    graphic: null,
    level: 0
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

  const quadWord = process.env.REACT_APP_DISCOVER;
  const version = process.env.REACT_APP_VERSION;

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

    const mapImageLayers = layers.filter(layer =>
      layer.type === 'map-image' && layer.visible && !config.projectInformation.excludedLayers.includes(layer.title));

    const { IdentifyParameters, IdentifyTask } = await esriModules();
    const identifyPromises = mapImageLayers.map(layer => {
      const task = new IdentifyTask({
        url: layer.url
      });
      const layerIds = layer.sublayers.filter(subLayer => subLayer.visible).map(subLayer => subLayer.id).toArray();

      if (layerIds.length === 0) {
        return new Promise(resolve => resolve({ results: [] }));
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
        width: view.width
      });

      return task.execute(parameters);
    });
    console.log('identifyPromises', identifyPromises);

    const identifyResponses = await Promise.all(identifyPromises.toArray());

    const layerNameLookup = await getLayersInMap(view.map);
    const identifyFeatures = identifyResponses.reduce((previous, current) => {
      return previous.concat(current.results.map(result => {
        return {
          geometry: result.feature.geometry,
          attributes: result.feature.attributes,
          popupTemplate: layerNameLookup[result.layerName].popupTemplate
        };
      }));
    }, []);

    // the manual querying of feature layer view below can be replaced with mapView.hitTest
    // once Esri adds support for returning all of the features in a layer rather than just the topmost
    const featureLayers = layers.filter(layer =>
      layer.type === 'feature' && layer.visible && !config.projectInformation.excludedLayers.includes(layer.title));
    const queryFeatureLayerView = async layer => {
      const layerView = await view.whenLayerView(layer);
      const results = await layerView.queryFeatures({
        geometry: clickEvent.mapPoint,
        returnGeometry: true,
        distance: config.IDENTIFY_PIXEL_TOLERANCE * view.resolution,
        units: 'feet',
        where: layer.definitionExpression,
        outFields: '*'
      });

      return results.features;
    };
    const queryFeaturePromises = featureLayers.toArray().map(queryFeatureLayerView);
    const queryFeatureSets = await Promise.all(queryFeaturePromises);
    const queryFeatures = queryFeatureSets.reduce((previous, current) => {
      return previous.concat(current);
    }, []);
    const selectedGraphics = queryFeatures.concat(identifyFeatures);

    console.log('selectedGraphics', selectedGraphics);

    finished = true;

    setSelectedGraphics(selectedGraphics);
    setShowIdentifyLoader(false);
  }, []);

  const mapOptions = {
    discoverKey: quadWord,
    zoomToGraphic: zoomToGraphic,
    onClick: onMapClick,
    setView,
    mapView,
    initialExtent: React.useMemo(() => {
      return (urlParams.scale) ? {
        x: urlParams.x,
        y: urlParams.y,
        scale: urlParams.scale
      } : null;
    }, [urlParams])
  };

  const toggleSidebar = () => {
    console.log('App:toggleSidebar');

    dispatchURLParams({ type: ACTION_TYPES.TOGGLE_SIDE_BAR });
  };

  const sidebarOptions = {
    sideBarOpen: !urlParams.sideBarClosed,
    toggleSidebar
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
      preserve: false
    });
  };

  const sherlockConfig = {
    provider: new MapServiceProvider(config.sherlock.serviceUrl, config.sherlock.searchField),
    placeHolder: t(config.sherlock.placeHolder),
    onSherlockMatch
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
        const { Graphic } = await esriModules();
        const symbolizedGraphic = new Graphic({
          ...newGraphic,
          symbol: config.SELECTION_SYMBOLS[newGraphic.geometry.type]
        });

        mapView.graphics.add(symbolizedGraphic);
        setGraphic(symbolizedGraphic);
      }
    } else {
      setGraphic(null);
    }
  }

  React.useEffect(() => {
    // reset graphics on tab change
    setSelectedGraphics([]);
  }, [currentTabConfig, setSelectedGraphics]);

  return (
    <div className="app">
      { currentTabConfig &&
        <>
          <Header title={t('trans:appTitle')} />
          <Sidebar toggleSidebar={toggleSidebar} isOpen={!urlParams.sideBarClosed}>
            <About version={version} />
          </Sidebar>
          <MapLens {...sidebarOptions}>
            <MapView {...mapOptions} />
            { currentTabConfig.filter && <MapWidget
              defaultOpen={config.openOnLoad.filter}
              name={t('trans:filter')}
              icon={faList}
              position={0}
              showReset={true}
              onReset={() => setResetFilter(true)}
              mapView={mapView}>
              <Filter {...currentTabConfig.filter}
                reset={resetFilter}
                mapView={mapView}
                webMapId={currentTabConfig.webMapId}
                />
            </MapWidget> }
            { currentTabConfig.queryFilter && <MapWidget
              defaultOpen={config.openOnLoad.queryFilter}
              name={`${t(currentTabConfig.name)} ${t('trans:filter')}`}
              icon={faList}
              position={0}
              showReset={true}
              onReset={() => setResetFilter(true)}
              mapView={mapView}>
              <QueryFilter {...currentTabConfig.queryFilter}
                reset={resetFilter}
                mapView={mapView}
                webMapId={currentTabConfig.webMapId}
                />
            </MapWidget> }
            { !currentTabConfig.useDefaultAGOLPopup && <MapWidget
              defaultOpen={config.openOnLoad.projectInfo}
              name={t('trans:projectInformation')}
              icon={faHandPointer}
              position={1}
              mapView={mapView}>
              <ProjectInformation
                graphics={selectedGraphics}
                highlightGraphic={highlightGraphic}
                showLoader={showIdentifyLoader} />
            </MapWidget> }
            <Sherlock {...sherlockConfig}></Sherlock>
          </MapLens>
        </>
      }
    </div>
  );
};

export default App;
