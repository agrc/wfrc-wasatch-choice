import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import './Symbols.scss';


export const Simple = props => {
  const [ symbols, setSymbols ] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getSymbol = async () => {
      console.log('Simple:getSymbol');

      const [ symbolUtils ] = await loadModules(['esri/symbols/support/symbolUtils']);

      const newSymbols = await Promise.all(props.layerNames.map(layerName => {
        const layer = props.layersLookup[layerName];

        return symbolUtils.renderPreviewHTML(layer.renderer.symbol);
      }));

      // prevent this from being called after the component has been unmounted
      if (mounted) {
        setSymbols(newSymbols);
      }
    };
    getSymbol();

    return () => mounted = false;
  }, [props.layerNames, props.layersLookup]);

  return (
    <div className="symbol-container">
      { symbols.map((symbol, index) =>
        <div key={index} className="symbol" dangerouslySetInnerHTML={{__html: symbol.innerHTML}}></div>
      )}
    </div>
  );
};

export const PolygonClasses = props => {
  const [ colors, setColors ] = useState([]);

  useEffect(() => {
    console.log('PolygonClasses:getColors');

    const colors = props.layersLookup[props.layerNames[0]]
      .renderer.uniqueValueInfos.map(info => info.symbol.color);

    // prevent this from being called after the component has been unmounted
    setColors(colors);
  }, [props.layerNames, props.layersLookup]);

  return (
    <div className="polygon-class-container">
      { colors.map((color, index) =>
        <div key={index}
          className="polygon-class"
          style={{backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`}}></div>
      )}
    </div>
  );
};
