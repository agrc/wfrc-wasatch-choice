import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import config, { getDefaultCurrentTabIds } from './config';

export const URLParamsContext = React.createContext();
export const ACTION_TYPES = {
  MAP_EXTENT: 'MAP_EXTENT',
  TOGGLE_SIDE_BAR: 'TOGGLE_SIDE_BAR',
  CURRENT_TAB_ID: 'CURRENT_TAB_ID',
  AVAILABLE_TAB_IDS: 'AVAILABLE_TAB_IDS',
  LANGUAGE: 'LANGUAGE',
};

const urlParamsReducer = (i18n) => {
  return (previousParams, action) => {
    console.log('urlParamsReducer');

    switch (action.type) {
      case ACTION_TYPES.MAP_EXTENT:
        return {
          ...previousParams,
          x: action.payload.x,
          y: action.payload.y,
          scale: action.payload.scale,
        };
      case ACTION_TYPES.TOGGLE_SIDE_BAR:
        return {
          ...previousParams,
          sideBarClosed: !previousParams.sideBarClosed,
        };
      case ACTION_TYPES.CURRENT_TAB_ID:
        return {
          ...previousParams,
          selectedMap: action.payload,
        };
      case ACTION_TYPES.AVAILABLE_TAB_IDS:
        return {
          ...previousParams,
          mapList: action.payload,
        };
      case ACTION_TYPES.LANGUAGE:
        i18n.changeLanguage(action.payload);

        return {
          ...previousParams,
          lng: action.payload,
        };
      default:
        throw Error(`unsupported dispatch action type: ${action.type}`);
    }
  };
};

const LIST_SEPARATOR = '.';
export const getInitialHash = (href, i18n, defaultCurrentTabIds) => {
  console.log('getInitialHash');

  const searchParams = new URLSearchParams(new URL(href).hash.slice(1));

  const parsedParams = {};

  for (const [key, value] of searchParams) {
    switch (key) {
      case 'mapList':
        parsedParams[key] = searchParams.get(key).split(LIST_SEPARATOR);

        continue;

      case 'lng':
        parsedParams[key] = i18n.changeLanguage(searchParams.get(key));

        continue;
    }

    if (!isNaN(parseInt(value, 10))) {
      parsedParams[key] = parseInt(value, 10);

      continue;
    } else if (['true', 'false'].includes(value)) {
      parsedParams[key] = value === 'true';

      continue;
    }

    parsedParams[key] = value;
  }

  return {
    mapList: defaultCurrentTabIds,
    selectedMap: defaultCurrentTabIds[0],
    sideBarClosed: window.innerWidth <= config.MIN_DESKTOP_WIDTH,
    ...parsedParams,
  };
};

export default function URLParams({ children }) {
  const { i18n } = useTranslation();
  const [urlParams, dispatchURLParams] = React.useReducer(
    urlParamsReducer(i18n),
    React.useMemo(() => getInitialHash(document.location.href, i18n, getDefaultCurrentTabIds()), [i18n])
  );

  // update current url when dispatch changes any params
  React.useEffect(() => {
    console.log('update URL');
    const url = new URL(document.location.href);
    url.hash = new URLSearchParams({
      ...urlParams,
      mapList: urlParams.mapList.join(LIST_SEPARATOR),
    }).toString();

    document.location.replace(url);
  }, [urlParams]);

  return (
    <URLParamsContext.Provider value={React.useMemo(() => [urlParams, dispatchURLParams], [urlParams])}>
      {children}
    </URLParamsContext.Provider>
  );
}
URLParams.propTypes = {
  children: PropTypes.node.isRequired,
};
