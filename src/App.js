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
import ProjectInformation from './components/ProjectInformation/ProjectInformation';
import esriModules from './esriModules';
import { getLayersInMap } from './components/Filter/Filter';
import { URLParamsContext, ACTION_TYPES } from './URLParams';


const App = () => {
  const [zoomToGraphic, setZoomToGraphic] = React.useState({
    graphic: null,
    level: 0
  });
  const mapView = React.useRef();
  const [resetFilter, setResetFilter] = React.useState(false);
  const [selectedGraphics, setSelectedGraphics] = React.useState([]);
  const [showIdentifyLoader, setShowIdentifyLoader] = React.useState(false);
  const [graphic, setGraphic] = React.useState(null);
  const [highlight, setHighlight] = React.useState(null);
  const currentTabConfig = useCurrentTabConfig();
  const [urlParams, dispatchURLParams] = React.useContext(URLParamsContext);

  const quadWord = process.env.REACT_APP_DISCOVER;
  const version = process.env.REACT_APP_VERSION;

  const onMapClick = React.useCallback(async (event) => {
    console.log('onMapClick', event);

    setSelectedGraphics([]);

    let finished = false;

    setTimeout(() => {
      if (!finished) {
        setShowIdentifyLoader(true);
      }
    }, config.LOADER_DELAY);

    const layers = mapView.current.map.layers;

    const mapImageLayers = layers.filter(layer => layer.type === 'map-image' && layer.visible);

    const { IdentifyParameters, IdentifyTask } = await esriModules();
    const identifyPromises = mapImageLayers.map(layer => {
      const task = new IdentifyTask({
        url: layer.url
      });
      const parameters = new IdentifyParameters({
        geometry: event.mapPoint,
        height: mapView.current.height,
        layerIds: layer.sublayers.filter(subLayer => subLayer.visible).map(subLayer => subLayer.id).toArray(),
        layerOption: 'visible',
        mapExtent: mapView.current.extent,
        returnFieldName: true,
        returnGeometry: true,
        tolerance: config.IDENTIFY_PIXEL_TOLERANCE,
        width: mapView.current.width
      });

      return task.execute(parameters);
    });
    console.log('identifyPromises', identifyPromises);

    const identifyResponses = await Promise.all(identifyPromises.toArray());

    const layerNameLookup = await getLayersInMap(mapView.current.map);
    const identifyFeatures = identifyResponses.reduce((previous, current) => {
      return previous.concat(current.results.map(result => {
        return {
          geometry: result.feature.geometry,
          attributes: result.feature.attributes,
          popupTemplate: layerNameLookup[result.layerName].popupTemplate
        };
      }));
    }, []);

    // the manual querying of feature layer view below can be replaced with MapView.current.hitTest
    // once Esri adds support for returning all of the features in a layer rather than just the topmost
    const featureLayers = layers.filter(layer => layer.type === 'feature' && layer.visible);
    const queryFeatureLayerView = async layer => {
      const layerView = await mapView.current.whenLayerView(layer);
      const results = await layerView.queryFeatures({
        geometry: event.mapPoint,
        returnGeometry: true,
        distance: config.IDENTIFY_PIXEL_TOLERANCE * mapView.current.resolution,
        units: 'feet',
        where: layer.definitionExpression
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
  }, [mapView]);

  const setView = React.useCallback((view) => {
    console.log('App:setView');

    mapView.current = view;
  }, []);

  const mapOptions = {
    discoverKey: quadWord,
    zoomToGraphic: zoomToGraphic,
    onClick: onMapClick,
    setView,
    initialExtent: (urlParams.scale) ? {
      x: urlParams.x,
      y: urlParams.y,
      scale: urlParams.scale
    } : null
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
    placeHolder: config.sherlock.placeHolder,
    onSherlockMatch
  };

  React.useEffect(() => {
    console.log('toggleFilter');

    if (resetFilter) {
      return () => {
        setResetFilter(false);
      }
    }
  }, [resetFilter]);

  const highlightGraphic = async (newGraphic) => {
    console.log('App:highlightGraphic', newGraphic);

    if (highlight) {
      highlight.remove();
      setHighlight(null);
    }

    if (graphic) {
      mapView.current.graphics.remove(graphic);
    }

    if (newGraphic) {
      try {
        const layerView = await mapView.current.whenLayerView(newGraphic.layer);
        setHighlight(layerView.highlight(newGraphic));
      } catch {
        const { Graphic } = await esriModules();
        const symbolizedGraphic = new Graphic({
          ...newGraphic,
          symbol: config.SELECTION_SYMBOLS[newGraphic.geometry.type]
        });

        mapView.current.graphics.add(symbolizedGraphic);
        setGraphic(symbolizedGraphic);
      }
    } else {
      setGraphic(null);
    }
  }

  React.useEffect(() => {
    // reset graphics on tab change
    setSelectedGraphics([]);
  }, [currentTabConfig, setSelectedGraphics])

  return (
    <div className="app">
      { currentTabConfig &&
        <>
          <Header title="Wasatch Choice Map" />
          <Sidebar toggleSidebar={toggleSidebar}>
            <About version={version} />
          </Sidebar>
          <MapLens {...sidebarOptions}>
            <MapView {...mapOptions} />
            { currentTabConfig.filter && <MapWidget
              defaultOpen={config.openOnLoad.filter}
              name="Filter"
              icon={faList}
              position={0}
              showReset={true}
              onReset={setResetFilter.bind(this, [true])}
              mapView={mapView.current}>
              <Filter {...currentTabConfig.filter}
                reset={resetFilter}
                mapView={mapView.current}
                webMapId={currentTabConfig.webMapId}
                />
            </MapWidget> }
            { !currentTabConfig.useDefaultAGOLPopup && <MapWidget
              defaultOpen={config.openOnLoad.projectInfo}
              name="Project Information"
              icon={faHandPointer}
              position={1}
              mapView={mapView.current}>
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
