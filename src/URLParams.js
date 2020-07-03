import { useEffect } from 'react';
import queryString from 'query-string';
import { useCurrentTabConfig } from './components/Tabs/TabsContext';
import config, { getCurrentTabIds } from './config';


const url = new URL(document.location.href);
const getCurrentHash = () => {
  return queryString.parse(url.hash.slice(1), {
    parseNumbers: true,
    parseBooleans: true
  });
};
const mixinHashValues = values => {
  console.log('mixinHashValues', values);

  url.hash = queryString.stringify({
    ...getCurrentHash(),
    ...values
  });
};

export default ({ mapExtent, setInitialExtent, sideBarOpen, setSideBarOpen }) => {
  const [ currentTabConfig, setCurrentTabConfig ] = useCurrentTabConfig();

  // get initial state from URL params
  useEffect(() => {
    console.log('URLParams setup');
    const currentHash = getCurrentHash();

    if (currentHash.x && currentHash.y && currentHash.scale) {
      setInitialExtent(currentHash);
    }

    if (currentHash.sideBarClosed) {
      setSideBarOpen(false);
    }

    const id = currentHash.currentTabId || getCurrentTabIds()[0];
    setCurrentTabConfig({id, ...config.tabInfos[id]});
  }, [setInitialExtent, setSideBarOpen, setCurrentTabConfig]);

  // currentTabId
  useEffect(() => {
    console.log('URLParams update hash: ', currentTabConfig);

    if (currentTabConfig) {
      mixinHashValues({
        currentTab: currentTabConfig.id
      });
    }
  }, [currentTabConfig]);

  // map extent
  useEffect(() => {
    console.log('URLParams update hash: mapExtent');

    if (!mapExtent) {
      return;
    }

    mixinHashValues({
      x: mapExtent.x,
      y: mapExtent.y,
      scale: mapExtent.scale
    });

    document.location.replace(url);
  }, [mapExtent]);

  // sideBarClosed
  useEffect(() => {
    console.log('URLParams update hash: sideBarOpen');

    mixinHashValues({
      sideBarClosed: !sideBarOpen
    });

    document.location.replace(url);
  }, [sideBarOpen]);

  return null;
}
