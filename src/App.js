import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapLens from './components/MapLens';
import MapView from './components/esrijs/MapView';
import config from './config';
import './App.scss';
import TabsContext from './components/Tabs/TabsContext';
import About from './components/About/About';
import MapWidget from './components/MapWidget/MapWidget';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Sherlock, MapServiceProvider } from './components/Sherlock';
import URLParams from './URLParams';
import Filter from './components/Filter/Filter';
import ProjectInformation from './components/ProjectInformation/ProjectInformation';
import esriModules from './esriModules';
import { getLayersInMap } from './components/Filter/Filter';


export default class App extends Component {
  state = {
    zoomToPoint: {
      zoomToGraphic: {
        graphic: {},
        level: 0
      }
    },
    mapClick: null,
    sideBarOpen: window.innerWidth >= config.MIN_DESKTOP_WIDTH,
    currentTabIndex: 0,
    mapExtent: null,
    mapView: null,
    mapReady: false,
    resetFilter: false,
    selectedGraphics: [],
    showIdentifyLoader: false
  };

  onMapClick = this.onMapClick.bind(this);
  onSherlockMatch = this.onSherlockMatch.bind(this);
  toggleSidebar = this.toggleSidebar.bind(this);
  closeSidebar = this.closeSidebar.bind(this);
  setView = this.setView.bind(this);
  onMapExtentChange = this.onMapExtentChange.bind(this);
  setInitialExtent = this.setInitialExtent.bind(this);
  setCurrentTab = this.setCurrentTab.bind(this);
  highlightGraphic = this.highlightGraphic.bind(this);
  highlight = null;

  render() {
    const quadWord = process.env.REACT_APP_DISCOVER;
    const version = process.env.REACT_APP_VERSION;

    const mapOptions = {
      discoverKey: quadWord,
      zoomToGraphic: this.state.zoomToGraphic,
      onClick: this.onMapClick,
      setView: this.setView,
      onExtentChange: this.onMapExtentChange
    }

    const sidebarOptions = {
      sideBarOpen: this.state.sideBarOpen,
      toggleSidebar: this.toggleSidebar
    }

    const sherlockConfig = {
      provider: new MapServiceProvider(config.sherlock.serviceUrl, config.sherlock.searchField),
      placeHolder: config.sherlock.placeHolder,
      onSherlockMatch: this.onSherlockMatch
    };

    const resetFilter = () => {
      console.log('resetFilter');

      this.setState({ resetFilter: true }, () => {
        this.setState({ resetFilter: false });
      });
    };

    return (
      <div className="app">
        <TabsContext.Provider value={{
          currentTabIndex: this.state.currentTabIndex,
          setCurrentTab: this.setCurrentTab
        }}>
          { this.state.mapReady &&
            <URLParams mapExtent={this.state.mapExtent} setInitialExtent={this.setInitialExtent}
              sideBarOpen={this.state.sideBarOpen} closeSidebar={this.closeSidebar} />
          }
          <Header title="Wasatch Choice Map" />
          <Sidebar toggleSidebar={this.toggleSidebar}>
            <About version={version} />
          </Sidebar>
          <MapLens {...sidebarOptions}>
            <MapView {...mapOptions} />
            <MapWidget
              // defaultOpen={true}
              name="Filter"
              icon={faList}
              position={0}
              showReset={true}
              onReset={resetFilter}
              mapView={this.state.mapView}>
              <Filter {...config.tabs[this.state.currentTabIndex].filter}
                reset={this.state.resetFilter}
                mapView={this.state.mapView}
                webMapId={config.tabs[this.state.currentTabIndex].webMapId}
                />
            </MapWidget>
            { !config.tabs[this.state.currentTabIndex].useDefaultAGOLPopup && <MapWidget
              // defaultOpen={true}
              name="Project Information"
              icon={faHandPointer}
              position={1}
              mapView={this.state.mapView}>
              <ProjectInformation
                graphics={this.state.selectedGraphics}
                highlightGraphic={this.highlightGraphic}
                showLoader={this.state.showIdentifyLoader} />
            </MapWidget> }
            <Sherlock {...sherlockConfig}></Sherlock>
          </MapLens>
        </TabsContext.Provider>
      </div>
    );
  }

  async highlightGraphic(graphic) {
    console.log('App:highlightGraphic', graphic);

    if (this.highlight) {
      this.highlight.remove();
      this.highlight = null;
    }

    if (this.graphic) {
      this.state.mapView.graphics.remove(this.graphic);
      this.graphic = null;
    }

    if (graphic) {
      try {
        const layerView = await this.state.mapView.whenLayerView(graphic.layer);
        this.highlight = layerView.highlight(graphic);
      } catch {
        const { Graphic } = await esriModules();
        const newGraphic = new Graphic({
          ...graphic,
          symbol: config.SELECTION_SYMBOLS[graphic.geometry.type]
        });

        this.state.mapView.graphics.add(newGraphic);
        this.graphic = newGraphic;
      }
    }
  }

  setCurrentTab(index) {
    console.log('App:setCurrentTab');

    if (index !== this.state.currentTabIndex) {
      this.setState({
        currentTabIndex: index,
        selectedGraphics: []
      });
    }
  };

  async onMapClick(event) {
    console.log('onMapClick', event);

    this.setState({ selectedGraphics: [] });

    let finished = false;

    setTimeout(() => {
      if (!finished) {
        this.setState({ showIdentifyLoader: true });
      }
    }, config.LOADER_DELAY);

    const mapView = this.state.mapView;
    const layers = mapView.map.layers;

    const mapImageLayers = layers.filter(layer => layer.type === 'map-image');

    const { IdentifyParameters, IdentifyTask } = await esriModules();
    const identifyPromises = mapImageLayers.map(layer => {
      const task = new IdentifyTask({
        url: layer.url
      });
      const parameters = new IdentifyParameters({
        geometry: event.mapPoint,
        height: mapView.height,
        layerIds: layer.sublayers.filter(subLayer => subLayer.visible).map(subLayer => subLayer.id).toArray(),
        layerOption: 'visible',
        mapExtent: mapView.extent,
        returnFieldName: true,
        returnGeometry: true,
        tolerance: 5,
        width: mapView.width
      });

      return task.execute(parameters);
    });
    console.log('identifyPromises', identifyPromises);

    const identifyResponses = await Promise.all(identifyPromises.toArray());

    const layerNameLookup = await getLayersInMap(mapView.map);
    const identifyFeatures = identifyResponses.reduce((previous, current) => {
      return previous.concat(current.results.map(result => {
        return {
          geometry: result.feature.geometry,
          attributes: result.feature.attributes,
          popupTemplate: layerNameLookup[result.layerName].popupTemplate
        };
      }));
    }, []);

    const hitTest = await this.state.mapView.hitTest(event);

    const selectedGraphics = hitTest.results.map(result => result.graphic).concat(identifyFeatures);

    console.log('selectedGraphics', selectedGraphics);

    finished = true;

    this.setState({
      selectedGraphics,
      showIdentifyLoader: false
    });
  }

  onMapExtentChange(newExtent) {
    this.setState({ mapExtent: newExtent });
  }

  setInitialExtent(extent) {
    console.log('setInitialExtent', JSON.stringify(arguments[0]));

    const mapView = this.state.mapView;
    mapView.center = {
      x: extent.x,
      y: extent.y,
      spatialReference: { wkid: 3857 }
    };
    mapView.scale = extent.scale;
  }

  showIdentify(value) {
    this.setState({ showIdentify: value });
  }

  onSherlockMatch(graphics) {
    // summary:
    //      Zooms to the passed in graphic(s).
    // graphics: esri.Graphic[]
    //      The esri.Graphic(s) that you want to zoom to.
    // tags:
    //      private
    console.log('sherlock:zoom', arguments);

    // check for point feature
    this.setState({
      zoomToGraphic: {
        graphic: graphics,
        preserve: false
      }
    });
  }

  toggleSidebar() {
    console.log('toggleSidebar');

    this.setState({sideBarOpen: !this.state.sideBarOpen });
  }

  closeSidebar() {
    this.setState({ sideBarOpen: false });
  }

  setView(view) {
    this.setState({ mapView: view });

    view.when(() => {
      this.setState({
        mapReady: true
      });
    });
  }
}
