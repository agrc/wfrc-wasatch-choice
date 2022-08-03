import { renderPreviewHTML } from '@arcgis/core/symbols/support/symbolUtils';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import config from '../../config';
import './Symbols.scss';

const getBackgroundColor = (color) => {
  // handle colors defined as rgb objects as well as hsa strings
  return color.hsa || `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

export const getSymbolFromInfos = (symbolInfos, minimums) => {
  let symbol;

  symbolInfos.some((info) => {
    if (info.symbol.size >= minimums.pointSize || info.symbol.width >= minimums.polylineWidth) {
      symbol = info.symbol;

      return true;
    }

    return false;
  });

  if (!symbol) {
    console.error(`No symbol larger than the minimum size was found in: ${symbolInfos}. Miniums: ${minimums}`);
  }
  return symbol;
};

export const Simple = (props) => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getSymbol = async () => {
      console.log('Simple:getSymbol');

      const layer = props.layersLookup[props.layerNames[0]];
      if (!layer) {
        // most likely layersLookup has layers from the last map and needs to update
        console.log('returning early: simple', props.layersLookup, props.layerNames);

        return;
      }
      const newSymbols = await Promise.all(
        props.layerNames.map((layerName) => {
          const layer = props.layersLookup[layerName];

          const symbol =
            layer.renderer.symbol || getSymbolFromInfos(layer.renderer.uniqueValueInfos, config.minimumLegendSizes);

          return renderPreviewHTML(symbol, { opacity: layer.opacity });
        })
      );

      // prevent this from being called after the component has been unmounted
      if (mounted) {
        setSymbols(newSymbols);
      }
    };
    getSymbol();

    return () => (mounted = false);
  }, [props.layerNames, props.layersLookup]);

  return (
    <div className="simple-symbol-container symbol-container">
      {symbols.map((symbol, index) => (
        <div key={index} className="symbol" dangerouslySetInnerHTML={{ __html: symbol.outerHTML }}></div>
      ))}
    </div>
  );
};

Simple.propTypes = {
  layersLookup: PropTypes.object.isRequired,
  layerNames: PropTypes.array.isRequired,
};

export const Classes = (props) => {
  const [data, setData] = useState({
    colors: [],
    title: null,
  });
  const [showPopover, setShowPopover] = useState(false);

  if (props.staticColors && data.colors.length === 0) {
    setData({
      colors: props.staticColors,
      title: null,
    });
  }

  useEffect(() => {
    if (props.staticColors) {
      return;
    }

    console.log('Classes:getColors');

    const layer = props.layersLookup[props.layerNames[0]];
    if (!layer) {
      // most likely layersLookup has layers from the last map and needs to update
      return;
    }

    const infos = layer.renderer.uniqueValueInfos || layer.renderer.classBreakInfos;
    if (!infos) {
      new Error(
        `Classes symbol requires a layer symbolized using unique values or class breaks. Layer: ${layer.title}`
      );
    }
    const colors = infos.map((info) => {
      return { ...info.symbol.color, label: info.label, a: layer.opacity };
    });

    setData({
      colors,
      title: layer.renderer.valueExpressionTitle,
    });
  }, [props.layerNames, props.layersLookup, props.staticColors]);

  const targetRef = useRef();

  return (
    <>
      <div className="symbol-container" ref={targetRef}>
        <div className="swatch-class-container">
          {data.colors.map((color, index) => (
            <div key={index} className="swatch" style={{ backgroundColor: getBackgroundColor(color) }}></div>
          ))}
        </div>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <Popover
        target={() => targetRef.current}
        isOpen={showPopover}
        trigger="hover"
        boundariesElement="viewport"
        toggle={() => setShowPopover(!showPopover)}
      >
        {data.title && <PopoverHeader>{data.title}</PopoverHeader>}
        <PopoverBody>
          {data.colors.map((color, index) => (
            <div key={index} className="popover-legend-row">
              <div style={{ backgroundColor: getBackgroundColor(color) }} className="legend-swatch"></div>
              <div className="legend-label">{color.label}</div>
            </div>
          ))}
        </PopoverBody>
      </Popover>
    </>
  );
};

Classes.propTypes = {
  layersLookup: PropTypes.object.isRequired,
  layerNames: PropTypes.array.isRequired,
  staticColors: PropTypes.array,
};

export const LinePoint = (props) => {
  const [symbols, setSymbols] = useState({ point: null, polyline: null });

  useEffect(() => {
    let mounted = true;
    const getSymbols = async () => {
      console.log('LinePoint:getSymbols');

      const newSymbols = {};

      if (!props.layersLookup[props.layerNames[0]]) {
        // most likely layersLookup has layers from the last map and needs to update
        return;
      }

      props.layerNames.forEach((layerName) => {
        const layer = props.layersLookup[layerName];
        if (!newSymbols[layer.geometryType]) {
          newSymbols[layer.geometryType] = true;
          layer.when(() => {
            newSymbols[layer.geometryType] = getSymbolFromInfos(
              layer.renderer.uniqueValueInfos,
              config.minimumLegendSizes
            );
          });
        }
      });

      newSymbols.polyline = await renderPreviewHTML(newSymbols.polyline);
      newSymbols.point = await renderPreviewHTML(newSymbols.point);

      // prevent this from being called after the component has been unmounted
      if (mounted) {
        setSymbols(newSymbols);
      }
    };
    getSymbols();

    return () => (mounted = false);
  }, [props.layerNames, props.layersLookup]);

  return (
    <div className="line-point-symbol-container symbol-container">
      {symbols.polyline &&
        symbols.point &&
        Object.entries(symbols).map(([geometryType, symbol]) => (
          <div key={geometryType} className="symbol" dangerouslySetInnerHTML={{ __html: symbol.innerHTML }}></div>
        ))}
    </div>
  );
};

LinePoint.propTypes = {
  layersLookup: PropTypes.object.isRequired,
  layerNames: PropTypes.array.isRequired,
};

export const Phase = (props) => {
  return (
    <div className="phase-symbol-container symbol-container">
      <div className="symbol" style={{ backgroundColor: props.color }}></div>
    </div>
  );
};

Phase.propTypes = {
  color: PropTypes.string.isRequired,
};

export const Dynamic = (props) => {
  // this assumes that all layers are part of the same map service
  const [legendInfoSets, setLegendInfoSets] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getLegend = async () => {
      console.log('Dynamic:getLegend');

      // get legend for entire map service
      const url = `${props.layersLookup[props.layerNames[0]].url.match(/^.*\//)[0]}legend?f=json`;
      const legendResponse = await fetch(url);
      const legendJson = await legendResponse.json();

      const legendLayerLookup = {};
      legendJson.layers.forEach((layer) => {
        legendLayerLookup[layer.layerId] = layer.legend;
      });

      const newInfoSets = props.symbolLayerIds.map((layerIds) => {
        return layerIds.split(',').map((id) => {
          let classIndex = 0;
          if (id.indexOf('-') > -1) {
            const [splitId, splitIndex] = id.split('-');
            id = splitId;
            classIndex = splitIndex;
          }

          return legendLayerLookup[id][classIndex];
        });
      });

      // prevent this from being called after the component has been unmounted
      if (mounted) {
        setLegendInfoSets(newInfoSets);
      }
    };
    getLegend();

    return () => (mounted = false);
  }, [props.layerNames, props.layersLookup, props.symbolLayerIds]);

  return (
    <div className="dynamic-symbol-container">
      {legendInfoSets.map((set, index) => (
        <DynamicSymbolContainer key={index} set={set} label={props.symbolLabels[index]} />
      ))}
    </div>
  );
};

Dynamic.propTypes = {
  layersLookup: PropTypes.object.isRequired,
  layerNames: PropTypes.array.isRequired,
  symbolLayerIds: PropTypes.array.isRequired,
  symbolLabels: PropTypes.array.isRequired,
};

const DynamicSymbolContainer = ({ set, label }) => {
  const [showPopover, setShowPopover] = useState(false);
  const containerRef = useRef();

  return (
    <>
      <div className="symbol-container" ref={containerRef}>
        {set.map((info, imgIndex) => (
          <img
            key={imgIndex}
            className="symbol"
            src={`data:${info.contentType};base64,${info.imageData}`}
            alt="swatch"
          />
        ))}
      </div>
      <Popover
        isOpen={showPopover}
        target={() => containerRef.current}
        toggle={() => setShowPopover(!showPopover)}
        boundariesElement="viewport"
        trigger="hover"
      >
        <PopoverBody>{label}</PopoverBody>
      </Popover>
    </>
  );
};

DynamicSymbolContainer.propTypes = {
  set: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export const Static = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const targetRef = useRef();

  return (
    <>
      <div className="symbol-container" ref={targetRef}>
        <div className="swatch-class-container">
          {props.staticColors &&
            props.staticColors.map((color, index) => (
              <div key={index} className="swatch" style={{ backgroundColor: getBackgroundColor(color) }}></div>
            ))}
        </div>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <Popover
        target={() => targetRef.current}
        isOpen={showPopover}
        trigger="hover"
        boundariesElement="viewport"
        toggle={() => setShowPopover(!showPopover)}
      >
        <PopoverBody>
          <img src={`/${props.imageFileName}`} alt="static legend" style={{ width: '250px' }} />
        </PopoverBody>
      </Popover>
    </>
  );
};

Static.propTypes = {
  staticColors: PropTypes.array.isRequired,
  imageFileName: PropTypes.string.isRequired,
};
