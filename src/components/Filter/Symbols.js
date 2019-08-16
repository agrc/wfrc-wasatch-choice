import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './Symbols.scss';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, PopoverBody } from 'reactstrap';


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
  const popoverTarget = useRef();
  const [ showPopover, setShowPopover ] = useState(false);

  useEffect(() => {
    console.log('PolygonClasses:getColors');

    const colors = props.layersLookup[props.layerNames[0]]
      .renderer.uniqueValueInfos.map(info => {
        return {...info.symbol.color, label: info.label};
      });

    // prevent this from being called after the component has been unmounted
    setColors(colors);
  }, [props.layerNames, props.layersLookup]);

  const getBackgroundColor = color => {
    return `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  };

  return (
    <>
      <div className="polygon-symbol-container" ref={popoverTarget}>
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
