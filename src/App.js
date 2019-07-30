import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapLens from './components/MapLens';
import MapView from './components/esrijs/MapView';
import config from './config';
import './App.css';
import TabsContext from './components/Tabs/TabsContext';


export default class App extends Component {
  state = {
    zoomToPoint: {
      zoomToGraphic: {
        graphic: {},
        level: 0
      }
    },
    mapClick: {},
    sideBarOpen: window.innerWidth >= config.MIN_DESKTOP_WIDTH,
    currentTabIndex: 0
  };

  onMapClick = this.onMapClick.bind(this);
  toggleSidebar = this.toggleSidebar.bind(this);
  setView = this.setView.bind(this);

  render() {
    const quadWord = process.env.REACT_APP_DISCOVER;
    const version = process.env.REACT_APP_VERSION;

    const mapOptions = {
      discoverKey: quadWord,
      zoomToGraphic: this.state.zoomToGraphic,
      onClick: this.onMapClick,
      setView: this.setView
    }

    const sidebarOptions = {
      sideBarOpen: this.state.sideBarOpen,
      toggleSidebar: this.toggleSidebar
    }

    const setCurrentTab = index => {
      this.setState({ currentTabIndex: index });
    };

    return (
      <div className="app">
        <TabsContext.Provider value={{
          currentTabIndex: this.state.currentTabIndex,
          setCurrentTab
        }}>
          <Header title="Wasatch Choice 2050" version={version} />
          <Sidebar>
            <p>BetterAbout Content will go here.</p>
          </Sidebar>
          <MapLens {...sidebarOptions}>
            <MapView {...mapOptions} />
          </MapLens>
        </TabsContext.Provider>
      </div>
    );
  }

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

  onMapClick(event) {
    this.setState({
      showIdentify: true,
      sideBarOpen: true,
      mapClick: event.mapPoint
    });
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

  togglePrint() {
    this.setState({
      showPrint: !this.state.showPrint
    });
  }

  toggleSidebar() {
    this.setState(state => {
      return { sideBarOpen: !state.sideBarOpen };
    });
  }

  setView(value) {
    this.setState({
      mapView: value
    });
  }
}
