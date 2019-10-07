import React, { useState, useCallback, useEffect } from 'react';
import Details from './Details';
import './ProjectInformation.scss';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';


export default ({ graphics }) => {
  console.log('ProjectInformation');

  const [ features, setFeatures ] = useState([]);
  const [ showLoader, setShowLoader ] = useState(false);

  const getOidField = useCallback(layer => {
    let oidField;
    layer.fields.some(field => {
      if (field.type === 'oid') {
        oidField = field.name;

        return true;
      }
      return false;
    });

    return oidField;
  }, []);
  const getAttributes = useCallback(async (graphic, graphicId) => {
    const layer = graphic.layer;
    const oidField = getOidField(layer);
    const parameters = {
      outFields: '*',
      where: `${oidField} = ${graphic.attributes[oidField]}`,
      returnGeometry: true,
      f: 'json'
    };
    const url = `${layer.url}/${layer.layerId}/query?${queryString.stringify(parameters)}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    return [responseJson.features[0], graphicId];
  }, [getOidField]);

  useEffect(() => {
    let finished = false;
    if (graphics && graphics.length > 0) {
      setTimeout(() => !finished && setShowLoader(true), 500);
      const graphicsLookup = {};
      const promises = Promise.all(graphics.map(graphic => {
        const graphicId = Symbol();
        graphicsLookup[graphicId] = graphic;

        return getAttributes(graphic, graphicId);
      }));
      promises.then(newFeatures => {
        const newGraphics = newFeatures.map(([feature, graphicId]) => {
          const graphic = graphicsLookup[graphicId];
          feature.layer = graphic.layer;

          return feature;
        });

        setFeatures(newGraphics);
        finished = true;
        setShowLoader(false);
      });
    }
  }, [graphics, getAttributes]);

  return (
    <div className="project-information">
      { features.length === 0 && <p>Click on a feature for more information</p> }
      { showLoader && <Loader type="Oval" className="loader" /> }
      { features.map((graphic, index) => <Details key={index} feature={graphic} />) }
    </div>
  );
};
