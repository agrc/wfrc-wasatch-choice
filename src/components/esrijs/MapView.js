import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import esriModules from '../../esriModules';
import { LayerSelectorContainer, LayerSelector } from '../../components/LayerSelector/LayerSelector';
import config from '../../config';
import TabsContext from '../Tabs/TabsContext';
import debounce from 'lodash.debounce';


export default class ReactMapView extends Component {
  static contextType = TabsContext;

  zoomLevel = 5;
  displayedZoomGraphic = null;

  render() {
    return (
      <div
        style={{ height: '100%', width: '100%' }}
        ref={mapViewDiv => {
          this.mapViewDiv = mapViewDiv;
        }}
      />
    );
  }

  async componentDidMount() {
    console.log('MapView:componentDidMount');

    const { WebMap, MapView, Home } = await esriModules();

    this.maps = config.tabs.map(({ webMapId }) => {
      return new WebMap({
        portalItem: {
          id: webMapId
        }
      });
    });

    let center;
    let zoom;
    let scale;
    if (this.props.initialExtent) {
      center = this.props.initialExtent;
      scale = this.props.initialExtent.scale;
    } else {
      center = config.defaultExtent;
      zoom = config.defaultExtent.zoomLevel
    }

    this.view = new MapView({
      container: this.mapViewDiv,
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

    this.props.setView(this.view);

    this.view.when(() => {
      console.log('view loaded');

      this.view.watch('extent', debounce(newExtent => {
        if (newExtent) {
          this.props.onExtentChange({
            x: Math.round(newExtent.center.x),
            y: Math.round(newExtent.center.y),
            scale: Math.round(this.view.scale)
          });
        }
      }, 100));

      this.view.on('click', this.props.onClick);

      this.defaultPopup = this.view.popup;
    });

    this.view.ui.add(new Home({ view: this.view }), 'top-left');

    this.selectorNode = document.createElement('div');

    if (!this.shouldHideLayerSelector()) {
      this.view.ui.add(this.selectorNode, 'top-left');

      this.setUpLayerSelector();
    }
  }

  async setUpLayerSelector() {
    const modules = await esriModules();

    const layerSelectorOptions = {
      view: this.view,
      quadWord: this.props.discoverKey,
      modules,
      ...config.layerSelector
    }

    ReactDOM.render(
      <LayerSelectorContainer>
        <LayerSelector {...layerSelectorOptions} ref={ref => this.layerSelector = ref} />
      </LayerSelectorContainer>,
      this.selectorNode);
  }

  shouldHideLayerSelector() {
    return config.tabs[this.context.currentTabIndex.toString()].hideLayerSelector;
  }

  async componentDidUpdate(prevProps) {
    console.log('MapView:componentDidUpdate');

    if (this.maps && this.context.currentTabIndex !== this.currentTabIndex) {
      // update web map
      this.view.map = this.maps[this.context.currentTabIndex];

      if (!config.tabs[this.context.currentTabIndex].useDefaultAGOLPopup) {
        this.view.popup = null;
      } else {
        const { Popup } = await esriModules();
        this.view.popup = new Popup();
      }

      // update layer selector visibility
      if (this.currentTabIndex && this.context.currentTabIndex && this.shouldHideLayerSelector() !==
        config.tabs[this.currentTabIndex.toString()].hideLayerSelector) {
        const method = (this.shouldHideLayerSelector()) ?
          this.view.ui.remove.bind(this.view.ui) : this.view.ui.add.bind(this.view.ui);
        method(this.selectorNode, 'top-left');
      }

      if (!this.shouldHideLayerSelector()) {
        if (!this.layerSelector) {
          await this.setUpLayerSelector();
        }

        this.layerSelector.forceMapUpdate();
      }

      this.currentTabIndex = this.context.currentTabIndex;
    }

    const currentGraphic = (((this.props || false).zoomToGraphic || false).graphic || false);
    const previousGraphic = (((prevProps || false).zoomToGraphic || false).graphic || false);

    if (currentGraphic !== previousGraphic && currentGraphic !== false) {
      const { graphic, level, preserve } = this.props.zoomToGraphic;

      this.zoomTo({
        target: graphic,
        zoom: level,
        preserve: preserve
      });
    }
  }

  async zoomTo(zoomObj) {
    console.log('app.zoomTo', arguments);

    if (!Array.isArray(zoomObj.target)) {
      zoomObj.target = [zoomObj.target];
    }

    if (!zoomObj.zoom) {
      if (zoomObj.target.every(graphic => graphic.geometry.type === 'point')) {
        zoomObj = {
          target: zoomObj.target,
          zoom: this.view.map.basemap.baseLayers.items[0].tileInfo.lods.length - this.zoomLevel
        };
      } else {
        zoomObj = {
          target: zoomObj.target
        };
      }
    }

    await this.view.goTo(zoomObj);

    if (this.displayedZoomGraphic) {
      this.view.graphics.removeMany(this.displayedZoomGraphic);
    }

    this.displayedZoomGraphic = zoomObj.target;

    this.view.graphics.addMany(zoomObj.target);

    const { watchUtils } = await esriModules();

    if (!zoomObj.preserve) {
      watchUtils.once(this.view, 'extent', () => {
        this.view.graphics.removeAll();
      });
    }
  }

  getView() {
    return this.view;
  }
}
