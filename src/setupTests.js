import appConfig from '../public/config.json';
import configSchema from '../public/configSchema.json';
import { setConfigs } from './config';
import { enableMocks } from 'jest-fetch-mock';

// mock fetch so that jest can handle it
enableMocks();
fetchMock.mockIf(/configSchema.json/, async () => {
  return {
    body: JSON.stringify(configSchema)
  };
});

beforeAll(async () => {
  await setConfigs(appConfig);
});
