import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import { useEffect, useState } from 'react';

// Cache layer lookup objects so that we don't have the crawl
// the same map multiple times and also to prevent any cached
// filters to become the defaultDefinitionExpression value for a layer.
const MAP_LAYERS = {};
export const getLayersInMap = async (map) => {
  console.log('getLayersInMap');

  const mapId = map.portalItem.id;
  if (MAP_LAYERS[mapId]) {
    return MAP_LAYERS[mapId];
  }

  const layerNameLookup = {};

  const getSublayers = (layer) => {
    layer.sublayers.forEach((subLayer) => {
      layerNameLookup[subLayer.title] = subLayer;

      if (subLayer.sublayers) {
        getSublayers(subLayer);
      }
    });
  };

  for (const layer of map.layers.items) {
    layerNameLookup[layer.title] = layer;

    await layer.when();
    layer.sublayers && getSublayers(layer);
  }

  Object.keys(layerNameLookup).forEach((layerName) => {
    const layer = layerNameLookup[layerName];
    layer.defaultDefinitionExpression = layer.definitionExpression || '1 = 1';
  });

  MAP_LAYERS[mapId] = layerNameLookup;

  return layerNameLookup;
};

export const getLayers = async (layerNames, map) => {
  console.log('getLayers');

  const layerNameLookup = await getLayersInMap(map);

  const layers = {};

  Object.keys(layerNames).forEach((name) => {
    const layer = layerNameLookup[layerNames[name]];

    if (!layer) {
      console.error(`Layer: ${layerNames[name]} not found in web map!`);
    }

    layers[name] = layer;
  });

  return layers;
};

export const useMapLayers = (mapView, layerNames) => {
  console.log('useMapLayers layerNames', layerNames);

  const [layers, setLayers] = useState();

  // reset layer lookup when the web map is changed
  useEffect(() => {
    const getLayersForNewMap = async () => {
      console.log('getLayersForNewMap');
      await whenOnce(() => mapView.ready);
      await mapView.map.when();

      const layers = await getLayers(layerNames, mapView.map);
      setLayers(layers);
    };

    if (mapView) {
      setLayers();
      getLayersForNewMap(mapView, layerNames);
    }
  }, [layerNames, mapView]);

  return layers;
};
