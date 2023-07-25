import '@arcgis/core/assets/esri/themes/light/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import appConfig from '../public/config.json';
import configSchema from '../public/config.schema.json';
import { setConfigs } from '../src/config';
import '../src/index.css';

setConfigs(appConfig, configSchema);

/** @type { import('@storybook/react').Preview } */
const preview = {};

export default preview;
