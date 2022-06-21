import { loadModules } from 'esri-loader';
import config from './config';

export default async () => {
  const requires = [
    'esri/Basemap',
    'esri/core/watchUtils',
    'esri/Graphic',
    'esri/layers/FeatureLayer',
    'esri/layers/support/LOD',
    'esri/layers/support/TileInfo',
    'esri/layers/WebTileLayer',
    'esri/tasks/IdentifyTask',
    'esri/tasks/support/IdentifyParameters',
    'esri/views/MapView',
    'esri/WebMap',
    'esri/widgets/Feature',
    'esri/widgets/Home',
    'esri/widgets/Popup',
  ];

  const [
    Basemap,
    watchUtils,
    Graphic,
    FeatureLayer,
    LOD,
    TileInfo,
    WebTileLayer,
    IdentifyTask,
    IdentifyParameters,
    MapView,
    WebMap,
    Feature,
    Home,
    Popup,
  ] = await loadModules(requires, config.ESRI_LOADER_CONFIG);

  return {
    Basemap,
    watchUtils,
    Graphic,
    FeatureLayer,
    LOD,
    TileInfo,
    WebTileLayer,
    IdentifyTask,
    IdentifyParameters,
    MapView,
    WebMap,
    Feature,
    Home,
    Popup,
  };
};
