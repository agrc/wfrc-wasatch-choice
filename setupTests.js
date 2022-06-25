import { vi } from 'vitest';
import appConfig from './public/config.json';
import configSchema from './public/config.schema.json';
import { setConfigs } from './src/config';

setConfigs(appConfig, configSchema);

vi.mock('react-device-detect', () => {
  return {
    isMobile: false,
  };
});
