import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import appConfig from '../public/config.json';
import configSchema from '../public/configSchema.json';
import { setConfigs } from '../src/config';

setConfigs(appConfig, configSchema);
