import { Validator } from 'jsonschema';
import configSchema from './configSchema.json';


let config = {
  MIN_DESKTOP_WIDTH: 768,
  WEB_MERCATOR_WKID: 3857,
  MARKER_FILL_COLOR: [130, 65, 47, 0.5],
  MARKER_OUTLINE_COLOR: [230, 126, 21, 0.7]
};

export const setConfigs = appConfigs => {
  // validate json format
  const validator = new Validator();

  try {
    validator.validate(appConfigs, configSchema, { throwError: true });
  } catch (error) {
    console.error('There is an error in config.json!', error);
  }

  // apply quad word from env
  Object.assign(config, JSON.parse(JSON.stringify(appConfigs).replace('{quadWord}', process.env.REACT_APP_DISCOVER)));
}

export default config;
