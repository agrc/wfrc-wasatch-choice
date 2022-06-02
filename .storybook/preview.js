import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { setConfigs } from '../src/config';
import appConfig from '../public/config.json';
import configSchema from '../public/config.schema.json';

setConfigs(appConfig, configSchema);
