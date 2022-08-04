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

// for some reason, vitest can't handle importing this module...
vi.mock('@arcgis/core/symbols/support/symbolUtils', () => {
  return {
    renderPreviewHTML: () => '',
  };
});
