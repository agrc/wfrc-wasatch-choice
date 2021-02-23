import appConfig from '../public/config.json';
import configSchema from '../public/config.schema.json';
import { setConfigs } from './config';
import * as rdd from 'react-device-detect';

setConfigs(appConfig, configSchema);

rdd.isMobile = false;
