import { loadModules } from 'esri-loader';
import config from './config';


export default async () => {
  const requires = [
    'esri/core/watchUtils',
    'esri/Graphic',
    'esri/tasks/IdentifyTask',
    'esri/tasks/support/IdentifyParameters',
    'esri/widgets/Feature'
  ];

  const [
    watchUtils,
    Graphic,
    IdentifyTask,
    IdentifyParameters,
    Feature
  ] = await loadModules(requires, config.ESRI_LOADER_CONFIG);

  return {
    watchUtils,
    Graphic,
    IdentifyTask,
    IdentifyParameters,
    Feature
  };
}
