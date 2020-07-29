import React from 'react';
import queryString from 'query-string';
import config, { getDefaultCurrentTabIds } from './config';


export const URLParamsContext = React.createContext();
export const ACTION_TYPES = {
  MAP_EXTENT: 'MAP_EXTENT',
  TOGGLE_SIDE_BAR: 'TOGGLE_SIDE_BAR',
  CURRENT_TAB_ID: 'CURRENT_TAB_ID',
  AVAILABLE_TAB_IDS: 'AVAILABLE_TAB_IDS'
};

const urlParamsReducer = (previousParams, action) => {
  console.log('urlParamsReducer');

  switch (action.type) {
    case ACTION_TYPES.MAP_EXTENT:
      return {
        ...previousParams,
        x: action.payload.x,
        y: action.payload.y,
        scale: action.payload.scale
      };
    case ACTION_TYPES.TOGGLE_SIDE_BAR:
      return {
        ...previousParams,
        sideBarClosed: !previousParams.sideBarClosed
      };
    case ACTION_TYPES.CURRENT_TAB_ID:
      return {
        ...previousParams,
        selectedMap: action.payload
      };
    case ACTION_TYPES.AVAILABLE_TAB_IDS:
      return {
        ...previousParams,
        mapList: action.payload
      };
    default:
      throw Error(`unsupported dispatch action type: ${action.type}`);
  }
};

const LIST_SEPARATOR = '.';
const getInitialHash = () => {
  const initialURLParams = queryString.parse(new URL(document.location.href).hash.slice(1), {
    parseNumbers: true,
    parseBooleans: true
  });

  if (initialURLParams.mapList) {
    initialURLParams.mapList = initialURLParams.mapList.split(LIST_SEPARATOR);
  }

  const defaultCurrentTabIds = getDefaultCurrentTabIds();

  return {
    mapList: defaultCurrentTabIds,
    selectedMap: defaultCurrentTabIds[0],
    sideBarClosed: window.innerWidth <= config.MIN_DESKTOP_WIDTH,
    ...initialURLParams
  };
};

export default ({ children }) => {
  const [urlParams, dispatchURLParams] = React.useReducer(urlParamsReducer, getInitialHash());

  // update current url when dispatch changes any params
  React.useEffect(() => {
    console.log('update URL');
    const url = new URL(document.location.href);
    url.hash = queryString.stringify({
      ...urlParams,
      mapList: urlParams.mapList.join(LIST_SEPARATOR)
    });

    document.location.replace(url);
  }, [urlParams]);

  return (
    <URLParamsContext.Provider value={React.useMemo(() => [urlParams, dispatchURLParams], [urlParams])}>
      {children}
    </URLParamsContext.Provider>
  );
}
