import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { loadModules, loadCss } from 'esri-loader';
import { LayerSelectorContainer, LayerSelector } from '../../components/LayerSelector/LayerSelector';
import config from '../../config';
import TabsContext from '../Tabs/TabsContext';


export default class ReactMapView extends Component {
  static contextType = TabsContext;

  zoomLevel = 5;
  displayedZoomGraphic = null;
  urls = {
    landownership: 'https://gis.trustlands.utah.gov/server/' +
      '/rest/services/Ownership/UT_SITLA_Ownership_LandOwnership_WM/FeatureServer/0'
  };

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
    loadCss('https://js.arcgis.com/4.12/esri/css/main.css');
    const mapRequires = [
      'esri/WebMap',
      'esri/views/MapView',
      'esri/layers/FeatureLayer'
    ];
    const selectorRequires = [
      'esri/layers/support/LOD',
      'esri/layers/support/TileInfo',
      'esri/layers/WebTileLayer',
      'esri/Basemap'
    ];

    const [WebMap, MapView, FeatureLayer, LOD, TileInfo, WebTileLayer, Basemap] = await loadModules(mapRequires.concat(selectorRequires));

    this.maps = config.tabs.map(({ webMapId }) => {
      return new WebMap({
        portalItem: {
          id: webMapId
        }
      });
    });

    this.view = new MapView({
      container: this.mapViewDiv,
      extent: {
        // Weber -> Davis counties
        spatialReference: {
          wkid: 3857
        },
        xmin: -12677739.904493758,
        ymin: 4833814.385353904,
        xmax: -12261005.22628318,
        ymax: 5093088.785297098
      },
      ui: {
        components: ['zoom']
      }
    });

    this.props.setView(this.view);

    const selectorNode = document.createElement('div');
    this.view.ui.add(selectorNode, 'top-right');

    const layerSelectorOptions = {
      view: this.view,
      quadWord: this.props.discoverKey,
      baseLayers: ['Hybrid', 'Lite', 'Terrain', 'Topo', 'Color IR'],
      overlays: ['Address Points', {
        Factory: FeatureLayer,
        url: this.urls.landownership,
        id: 'Land Ownership',
        opacity: 0.3
      }],
      modules: [LOD, TileInfo, WebTileLayer, Basemap]
    }

    ReactDOM.render(
      <LayerSelectorContainer>
        <LayerSelector {...layerSelectorOptions}></LayerSelector>
      </LayerSelectorContainer>,
      selectorNode);

    this.view.on('click', this.props.onClick);
  }

  componentDidUpdate(prevProps) {
    if (this.context.currentTabIndex !== this.currentTabIndex) {
      this.view.map = this.maps[this.context.currentTabIndex];
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

    const [watchUtils] = await loadModules(['esri/core/watchUtils']);

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
