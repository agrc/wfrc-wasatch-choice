import appConfig from '../public/config.json';
import configSchema from '../public/configSchema.json';
import { setConfigs } from './config';

setConfigs(appConfig, configSchema);
