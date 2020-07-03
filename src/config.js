import { Validator } from 'jsonschema';
import configSchema from './configSchema.json';


const SELECTION_COLOR = [75, 255, 217];
const TRANSPARENT_SELECTION_COLOR = SELECTION_COLOR.concat([0.5]);
let config = {
  MIN_DESKTOP_WIDTH: 860,
  MAX_SMALL_SCREEN_WIDTH: 350,
  WEB_MERCATOR_WKID: 3857,
  MARKER_FILL_COLOR: [130, 65, 47, 0.5],
  MARKER_OUTLINE_COLOR: [230, 126, 21, 0.7],
  ESRI_LOADER_CONFIG: {
    version: '4.13',
    css: true
  },
  SELECTION_SYMBOLS: {
    point: {
      type: 'simple-marker',
      color: TRANSPARENT_SELECTION_COLOR,
      outline: {
        color: SELECTION_COLOR
      }
    },
    polyline: {
      type: 'simple-line',
      color: TRANSPARENT_SELECTION_COLOR,
      width: '5px'
    },
    polygon: {
      type: 'simple-fill',
      color: TRANSPARENT_SELECTION_COLOR,
      outline: {
        color: SELECTION_COLOR
      }
    }
  },
  LOADER_DELAY: 250,
  IDENTIFY_PIXEL_TOLERANCE: 7
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
};

export const getCurrentTabIds = () => {
  return Object.keys(config.tabInfos).slice(0, 5);
};

export default config;
