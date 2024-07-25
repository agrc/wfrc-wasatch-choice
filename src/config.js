import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Validator } from 'jsonschema';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { URLParamsContext } from './URLParams';

const SELECTION_COLOR = [75, 255, 217];
const TRANSPARENT_SELECTION_COLOR = SELECTION_COLOR.concat([0.5]);
let config = {
  MIN_DESKTOP_WIDTH: 860,
  MAX_SMALL_SCREEN_WIDTH: 350,
  WEB_MERCATOR_WKID: 3857,
  MARKER_FILL_COLOR: [130, 65, 47, 0.5],
  MARKER_OUTLINE_COLOR: [230, 126, 21, 0.7],
  SELECTION_SYMBOLS: {
    point: {
      type: 'simple-marker',
      color: TRANSPARENT_SELECTION_COLOR,
      outline: {
        color: SELECTION_COLOR,
      },
    },
    polyline: {
      type: 'simple-line',
      color: TRANSPARENT_SELECTION_COLOR,
      width: '5px',
    },
    polygon: {
      type: 'simple-fill',
      color: TRANSPARENT_SELECTION_COLOR,
      outline: {
        color: SELECTION_COLOR,
      },
    },
  },
  LOADER_DELAY: 250,
  IDENTIFY_PIXEL_TOLERANCE: 7,
};

// optional configSchema is for testing and storybook since they are clumsy when it comes to
// async setup
export const setConfigs = async (appConfigs, configSchema = null) => {
  // we are fetching this rather than importing it so that it can be hosted publicly and available
  // for WFRC to reference it in their config files
  if (!configSchema) {
    const response = await fetch('config.schema.json');
    configSchema = await response.json();
  }

  // validate json format
  const validator = new Validator();

  try {
    validator.validate(appConfigs, configSchema, { throwError: true });
  } catch (error) {
    console.error('There is an error in config.json!', error);
  }

  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      detection: {
        order: ['navigator'], // only look at the navigator object to determine locale
        caches: [], // disable locale caching
      },
      resources: appConfigs.translations,
      interpolation: {
        escapeValue: false,
      },
      fallbackLng: 'en',
    });

  // apply quad word from env
  Object.assign(
    config,
    JSON.parse(
      JSON.stringify(appConfigs).replace(
        '{quadWord}',
        import.meta.env.VITE_DISCOVER,
      ),
    ),
  );
};

export const getDefaultCurrentTabIds = () => {
  return Object.keys(config.mapInfos).slice(0, config.defaultTabsNum);
};

export const useCurrentTabConfig = () => {
  const context = React.useContext(URLParamsContext);

  // return null for the AboutTests component
  let returnValue = () => null;
  if (context) {
    const urlParams = context[0];

    returnValue = () => {
      return {
        id: urlParams.selectedMap,
        ...config.mapInfos[urlParams.selectedMap],
      };
    };
  }

  // make sure that this object doesn't change on each re-render...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(returnValue, [context]);
};

export default config;
