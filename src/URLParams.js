import { useEffect } from 'react';
import queryString from 'query-string';


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
  useEffect(() => {
    console.log('URLParams setup');
    const currentHash = getCurrentHash();

    if (currentHash.x && currentHash.y && currentHash.scale) {
      setInitialExtent(currentHash);
    }

    if (currentHash.sideBarClosed) {
      closeSidebar();
    }
  }, [setInitialExtent, closeSidebar]);

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

  useEffect(() => {
    console.log('URLParams update hash: sideBarOpen');

    mixinHashValues({
      sideBarClosed: !sideBarOpen
    });

    document.location.replace(url);
  }, [sideBarOpen]);

  return null;
}
