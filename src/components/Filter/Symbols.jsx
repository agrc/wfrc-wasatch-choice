import { renderPreviewHTML } from '@arcgis/core/symbols/support/symbolUtils';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import './Symbols.scss';

const getBackgroundColor = (color) => {
  // handle colors defined as rgb objects as well as hsa strings
  return color.hsa || `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

export const getSymbolFromInfos = (symbolInfos, classIndex) => {
  const symbol = symbolInfos[classIndex ?? 0].symbol;

  if (!symbol) {
    console.error(`No symbol was found in: ${JSON.stringify(symbolInfos, null, 2)}`);
  }
  return symbol;
};

function FeatureLayerSymbol({ layersLookup, layerName }) {
  const symbolContainer = useRef(null);
  const [parsedLayerName, uniqueValueInfoIndex] = layerName.split('-');
  const layer = layersLookup[parsedLayerName];

  useEffect(() => {
    const giddyUp = async () => {
      const symbol = layer.renderer.symbol || getSymbolFromInfos(layer.renderer.uniqueValueInfos, uniqueValueInfoIndex);

      const preview = await renderPreviewHTML(symbol, {
        opacity: layer.opacity,
        node: symbolContainer.current,
      });

      // not sure why Esri adds these attributes, but they cause the image to be shrunk
      if (window.devicePixelRatio < 2) {
        preview.removeAttribute('width');
        preview.removeAttribute('height');
      }
    };
    if (layer && symbolContainer.current?.children.length === 0) {
      giddyUp();
    }
  }, [layer, uniqueValueInfoIndex]);

  return <div ref={symbolContainer} className="symbol"></div>;
}

FeatureLayerSymbol.propTypes = {
  layersLookup: PropTypes.object.isRequired,
  layerName: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function SymbolGroup({ label, group, layersLookup }) {
  const [showPopover, setShowPopover] = useState(false);
  const targetRef = useRef();

  return (
    <>
      <div ref={targetRef} className="symbol-overlap-container">
        {group.map((layerName, index) => (
          <FeatureLayerSymbol key={index} layersLookup={layersLookup} layerName={layerName} />
        ))}
      </div>
      {label ? (
        <Popover
          target={() => targetRef.current}
          isOpen={showPopover}
          trigger="hover"
          boundariesElement="viewport"
          toggle={() => setShowPopover(!showPopover)}
        >
          <PopoverBody>{label}</PopoverBody>
        </Popover>
      ) : null}
    </>
  );
}

SymbolGroup.propTypes = {
  group: PropTypes.array.isRequired,
  layersLookup: PropTypes.object.isRequired,
  label: PropTypes.string,
};

export const Simple = ({ layerNames, layersLookup, symbolLayerNames, symbolLabels }) => {
  return (
    <div className="simple-symbol-container symbol-container">
      {symbolLayerNames
        ? symbolLayerNames.map((group, groupIndex) => (
            <SymbolGroup
              key={groupIndex}
              label={symbolLabels ? symbolLabels[groupIndex] : null}
              group={group}
              layersLookup={layersLookup}
            />
          ))
        : layerNames.map((layerName, index) => (
            <SymbolGroup
              key={index}
              label={symbolLabels ? symbolLabels[0] : null}
              group={[layerName]}
              layersLookup={layersLookup}
            />
          ))}
    </div>
  );
};

Simple.propTypes = {
  layersLookup: PropTypes.object.isRequired,
  layerNames: PropTypes.array.isRequired,
  symbolLayerNames: PropTypes.arrayOf(PropTypes.array),
  symbolLabels: PropTypes.arrayOf(PropTypes.string),
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
      throw new Error(
        `Classes symbol requires a layer symbolized using unique values or class breaks. Layer: ${layer.title}`,
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

export const Swatch = ({ color }) => {
  return (
    <div className="swatch-symbol-container symbol-container">
      <div className="symbol" style={{ backgroundColor: color }}></div>
    </div>
  );
};

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
};

export function Image({ imageFileName }) {
  return (
    <div className="image-symbol-container">
      <img src={`/${imageFileName}`} alt="symbol image" />
    </div>
  );
}

Image.propTypes = {
  imageFileName: PropTypes.string.isRequired,
};
