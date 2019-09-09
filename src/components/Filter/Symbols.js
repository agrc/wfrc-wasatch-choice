import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './Symbols.scss';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, PopoverBody } from 'reactstrap';


const getBackgroundColor = color => {
  // handle colors defined as rgb objects as well as hsa strings
  return color.hsa || `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

export const Simple = props => {
  const [ symbols, setSymbols ] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getSymbol = async () => {
      console.log('Simple:getSymbol');

      const [ symbolUtils ] = await loadModules(['esri/symbols/support/symbolUtils']);

      const newSymbols = await Promise.all(props.layerNames.map(layerName => {
        const layer = props.layersLookup[layerName];

        const symbol = layer.renderer.symbol || layer.renderer.uniqueValueInfos[0].symbol;

        return symbolUtils.renderPreviewHTML(symbol, { opacity: layer.opacity });
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
    <div className="simple-symbol-container symbol-container">
      { symbols.map((symbol, index) =>
        <div key={index} className="symbol" dangerouslySetInnerHTML={{__html: symbol.outerHTML}}></div>
      )}
    </div>
  );
};

export const PolygonClasses = props => {
  const [ colors, setColors ] = useState([]);
  const popoverTarget = useRef();
  const [ showPopover, setShowPopover ] = useState(false);

  if (props.staticColors && colors.length === 0) {
    setColors(props.staticColors);
  }

  useEffect(() => {
    if (props.staticColors) {
      return;
    }

    console.log('PolygonClasses:getColors');

    const colors = props.layersLookup[props.layerNames[0]]
      .renderer.uniqueValueInfos.map(info => {
        return {...info.symbol.color, label: info.label};
      });

    // prevent this from being called after the component has been unmounted
    setColors(colors);
  }, [props.layerNames, props.layersLookup, props.staticColors]);

  return (
    <>
      <div className="polygon-symbol-container symbol-container" ref={popoverTarget}>
        <div className="polygon-class-container">
          { colors.map((color, index) =>
            <div key={index}
              className="polygon-class"
              style={{backgroundColor: getBackgroundColor(color)}}></div>
          )}
        </div>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <Popover
        placement="bottom-start"
        target={popoverTarget}
        isOpen={showPopover}
        trigger="hover"
        toggle={() => setShowPopover(!showPopover)}>
        <PopoverBody>
          { colors.map((color, index) =>
            <div key={index} className="popover-legend-row">
              <div style={{backgroundColor: getBackgroundColor(color)}} className="legend-swatch"></div>
              <div>{color.label}</div>
            </div>
          )}
        </PopoverBody>
      </Popover>
    </>
  );
};

export const LinePoint = props => {
  const [symbols, setSymbols] = useState({ point: null, polyline: null });

  useEffect(() => {
    let mounted = true;
    const getSymbols = async () => {
      console.log('LinePoint:getSymbols');

      const [symbolUtils] = await loadModules(['esri/symbols/support/symbolUtils']);

      const newSymbols = {};

      props.layerNames.forEach(layerName => {
        const layer = props.layersLookup[layerName];
        if (!newSymbols[layer.geometryType]) {
          newSymbols[layer.geometryType] = true;
          layer.when(() => {
            newSymbols[layer.geometryType] = layer.renderer.uniqueValueInfos[0].symbol;
          });
        }
      });

      newSymbols.polyline = await symbolUtils.renderPreviewHTML(newSymbols.polyline);
      newSymbols.point = await symbolUtils.renderPreviewHTML(newSymbols.point);

      // prevent this from being called after the component has been unmounted
      if (mounted) {
        setSymbols(newSymbols);
      }
    };
    getSymbols();

    return () => mounted = false;
  }, [props.layerNames, props.layersLookup]);

  return (
    <div className="line-point-symbol-container symbol-container">
      {symbols.polyline && symbols.point && Object.entries(symbols).map(([geometryType, symbol]) =>
        <div key={geometryType} className="symbol" dangerouslySetInnerHTML={{ __html: symbol.innerHTML }}></div>
      )}
    </div>
  );
};

export const Phase = props => {
  return (
    <div className="phase-symbol-container symbol-container">
      <div className="symbol" style={{backgroundColor: props.color}}></div>
    </div>
  );
};

export const Dynamic = props => {
  // this assumes that all layers are part of the same map service
  const [ legendInfoSets, setLegendInfoSets ] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getLegend = async () => {
      console.log('Dynamic:getLegend');

      // get legend for entire map service
      const url = `${props.layersLookup[props.layerNames[0]].url.match(/^.*\//)[0]}legend?f=json`;
      const legendResponse = await fetch(url);
      const legendJson = await legendResponse.json();

      const legendLayerLookup = {};
      legendJson.layers.forEach(layer => {
        legendLayerLookup[layer.layerId] = layer.legend;
      });

      const newInfoSets = props.symbolLayerIds.map(layerIds =>
        layerIds.split(',').map(id => {
          let classIndex = 0;
          if (id.indexOf('-') > -1) {
            const [ splitId, splitIndex ] = id.split('-');
            id = splitId;
            classIndex = splitIndex;
          }

          return legendLayerLookup[id][classIndex];
        })
      );

      // prevent this from being called after the component has been unmounted
      if (mounted) {
        setLegendInfoSets(newInfoSets);
      }
    };
    getLegend();

    return () => mounted = false;
  }, [props.layerNames, props.layersLookup, props.symbolLayerIds]);

  return (
    <div className="dynamic-symbol-container">
      { legendInfoSets.map((set, index) =>
        <div key={index} className="symbol-container">
          { set.map((info, imgIndex) =>
            <img key={imgIndex}
              className='symbol'
              src={`data:${info.contentType};base64,${info.imageData}`}
              alt='swatch' />
          ) }
        </div>
      ) }
    </div>
  );
};
