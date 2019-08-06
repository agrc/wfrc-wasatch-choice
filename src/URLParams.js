import { useEffect, useContext } from 'react';
import queryString from 'query-string';
import TabsContext from './components/Tabs/TabsContext';


const url = new URL(document.location.href);
const getCurrentHash = () => {
  return queryString.parse(url.hash.slice(1), {
    parseNumbers: true,
    parseBooleans: true
  });
};
const mixinHashValues = values => {
  url.hash = queryString.stringify({
    ...getCurrentHash(),
    ...values
  });
};

export default ({ mapExtent, setInitialExtent, sideBarOpen, closeSidebar }) => {
  const { currentTabIndex, setCurrentTab } = useContext(TabsContext);

  // get initial state from URL params
  useEffect(() => {
    console.log('URLParams setup');
    const currentHash = getCurrentHash();

    if (currentHash.x && currentHash.y && currentHash.scale) {
      setInitialExtent(currentHash);
    }

    if (currentHash.sideBarClosed) {
      closeSidebar();
    }

    if (currentHash.currentTabIndex && currentHash.currentTabIndex > 0) {
      setCurrentTab(currentHash.currentTabIndex);
    }
  }, [setInitialExtent, closeSidebar, setCurrentTab]);

  // currentTabIndex
  useEffect(() => {
    mixinHashValues({
      currentTabIndex
    });
  }, [currentTabIndex]);

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
