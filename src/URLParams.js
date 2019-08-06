import queryString from 'query-string';


export default ({ mapExtent, setInitialExtent }) => {
  const getHash = () => {
    return queryString.parse(new URL(document.location.href).hash.slice(1), { parseNumbers: true });
  };

  if (!mapExtent) {
    const hash = getHash();

    if (hash.x && hash.y && hash.scale) {
      setInitialExtent(hash);
    }
  } else {
    const url = new URL(document.location.href);
    url.hash = queryString.stringify({
      x: mapExtent.x,
      y: mapExtent.y,
      scale: mapExtent.scale
    });

    document.location.replace(url);
  }

  return null;
}
