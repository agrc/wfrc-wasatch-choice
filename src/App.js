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
    selectedGraphics: []
  };

  onMapClick = this.onMapClick.bind(this);
  onSherlockMatch = this.onSherlockMatch.bind(this);
  toggleSidebar = this.toggleSidebar.bind(this);
  closeSidebar = this.closeSidebar.bind(this);
  setView = this.setView.bind(this);
  onMapExtentChange = this.onMapExtentChange.bind(this);
  setInitialExtent = this.setInitialExtent.bind(this);
  setCurrentTab = this.setCurrentTab.bind(this);

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
          <Sidebar>
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
            <MapWidget
              // defaultOpen={true}
              name="Project Information"
              icon={faHandPointer}
              position={1}
              mapView={this.state.mapView}>
              <ProjectInformation graphics={this.state.selectedGraphics} />
            </MapWidget>
            <Sherlock {...sherlockConfig}></Sherlock>
          </MapLens>
        </TabsContext.Provider>
      </div>
    );
  }

  setCurrentTab(index) {
    this.setState({ currentTabIndex: index });
  };

  onFindAddress(graphic) {
    this.setState({
      zoomToGraphic: {
        graphic: graphic,
        level: 18
      }
    });
  };

  onFindAddressError(e) {
    console.error(e);
  };

  async onMapClick(event) {
    console.log('onMapClick', event);

    const hitTest = await this.state.mapView.hitTest(event);

    const selectedGraphics = hitTest.results.map(result => result.graphic);

    console.log('selectedGraphics', selectedGraphics);

    this.setState({ selectedGraphics });
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
