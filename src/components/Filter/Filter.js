import React, { useState, useEffect } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import './Filter.scss';
import { Simple, PolygonClasses, LinePoint, Phase, Dynamic } from './Symbols';


const SYMBOLS = {
  simple: Simple,
  polygonClasses: PolygonClasses,
  linePoint: LinePoint,
  phase: Phase,
  dynamic: Dynamic
};

export const getLayers = async (layerNames, map) => {
  console.log('Filter.getLayers');

  const layerNameLookup = {};

  const getSublayers = layer => {
    layer.sublayers.forEach(subLayer => {
      layerNameLookup[subLayer.title] = subLayer;

      if (subLayer.sublayers) {
        getSublayers(subLayer);
      }
    });
  }

  for (const layer of map.layers.items) {
    layerNameLookup[layer.title] = layer;

    await layer.when();
    layer.sublayers && getSublayers(layer);
  };

  console.log('layerNameLookup', layerNameLookup);

  const layers = {};

  Object.keys(layerNames).forEach(name => {
    const layer = layerNameLookup[layerNames[name]];

    if (!layer) {
      console.error(`Layer: ${layerNames[name]} not found in web map!`);
    }

    layers[name] = layer;
  });

  return layers;
}

export const getPhaseQuery = (phaseInfo, checkedPhaseIndexes) => {
  // translate the phase info into a definition query taking into account the selected phases

  const showNoneQuery = '1 = 2';
  if (checkedPhaseIndexes.length === 0) {
    return showNoneQuery;
  } else if (checkedPhaseIndexes.length === 4) {
    return null;
  }

  const filterPhase = (_, i) => {
    return checkedPhaseIndexes.includes(i);
  };
  const removeDuplicates = inStatement => {
    return [...new Set(inStatement.split(joinTxt))].join(joinTxt);
  };
  const wrapWithQuotes = text => {
    return `'${text}'`;
  };
  const isStringQuery = typeof phaseInfo[1] === 'string';

  let joinTxt = ', ';
  if (isStringQuery) {
    joinTxt = wrapWithQuotes(joinTxt);
  }
  let queryValues = removeDuplicates(phaseInfo.slice(1).filter(filterPhase).join(joinTxt));
  if (queryValues.length === 0) {
    return showNoneQuery;
  }
  if (isStringQuery) {
    queryValues = wrapWithQuotes(queryValues);
  }

  return `${phaseInfo[0]} IN (${queryValues})`;
};

export const validateCheckboxLayerKeys = (layerNames, checkboxes) => {
  const layerKeys = Object.keys(layerNames);
  Object.keys(checkboxes).forEach(checkboxKey => {
    if (checkboxes[checkboxKey].layers) {
      checkboxes[checkboxKey].layers.forEach(layerKey => {
        if (layerKeys.indexOf(layerKey) === -1) {
          console.error(`Cannot find layer: ${layerKey} from checkbox: ${checkboxKey}`);
        }
      });
    }
  });
};

export default props => {
  const [ filterByPhasing, setFilterByPhasing ] = useState(false);
  const [ layers, setLayers ] = useState();

  useEffect(() => {
    validateCheckboxLayerKeys(props.layerNames, props.checkboxes);
  }, [props.layerNames, props.checkboxes]);

  // only get new layers after the map has been updated to match the current tab
  if (props.mapView && props.mapView.map &&
      props.webMapId === props.mapView.map.portalItem.id && !layers) {
    console.log(props.mapView.map.portalItem.id, props.mapView.map.loaded);
    props.mapView.map.when(async () => {
      setLayers(await getLayers(props.layerNames, props.mapView.map));
    });
  }

  const setLayersVisibility = (layerKeys, visible) => {
    if (layers) {
      layerKeys.forEach(key => {
        const layer = layers[key];
        if (layer) {
          layer.visible = visible;
        }
      });
    }
  };

  return (
    <div className="filter">
      { props.groups && props.groups.map(groupConfig =>
          <div className="group-container" key={groupConfig.label}>
            { (groupConfig.radio) ?
              <RadioGroup {...groupConfig}
                reset={props.reset}
                checkboxConfigs={props.checkboxes}
                setLayersVisibility={setLayersVisibility} /> :
              <Parent {...groupConfig}
                reset={props.reset}
                checkboxConfigs={props.checkboxes}
                setLayersVisibility={setLayersVisibility}
                filterByPhasing={filterByPhasing}
                setFilterByPhasing={setFilterByPhasing}
                layers={layers}
                phases={props.phases}
                allGroupConfigs={props.groups} /> }
          </div>)
      }
      { !props.groups && Object.keys(props.checkboxes).map(checkboxName => {
        const checkboxConfig = props.checkboxes[checkboxName];

        return (
          <Child key={checkboxName}
              name={checkboxConfig.label}
              reset={props.reset}
              {...checkboxConfig}
              layersLookup={layers}
              setLayersVisibility={setLayersVisibility} />
        );
      }) }
    </div>
  );
};

const RadioGroup = props => {
  const [ visible, setVisible ] = useState(true);
  const defaultRadioButton = props.checkboxes[0];
  const [ selectedRadioButton, setSelectedRadioButton ] = useState(defaultRadioButton);
  const onRadioChange = checkboxName => {
    setSelectedRadioButton(checkboxName);
  };
  const allLayerKeys = props.checkboxes
    .reduce((layers, checkboxName) => layers.concat(props.checkboxConfigs[checkboxName].layers), []);
  const visibleLayerKeys = (visible) ? props.checkboxConfigs[selectedRadioButton].layers : [];
  const hiddenLayersKeys = allLayerKeys.filter(key => visibleLayerKeys.indexOf(key) === -1);
  props.setLayersVisibility(hiddenLayersKeys, false);
  props.setLayersVisibility(visibleLayerKeys, true);

  useEffect(() => {
    if (props.reset) {
      setVisible(true);
      setSelectedRadioButton(defaultRadioButton);
    }
  }, [props.reset, defaultRadioButton]);

  return (
    <>
      <FormGroup check>
        <Label check>
          <Input type="checkbox"
            checked={visible}
            onChange={() => setVisible(!visible)} />
          {props.label}
        </Label>
      </FormGroup>
      <div className="child-checkbox-container">
        {props.checkboxes.map(checkboxName => {
          const checkboxConfig = props.checkboxConfigs[checkboxName];

          return (
            <FormGroup check key={checkboxName}>
              <Label check>
                <Input
                  type="radio"
                  name="props.label"
                  checked={selectedRadioButton === checkboxName}
                  onChange={() => onRadioChange(checkboxName)} />
                  {checkboxConfig.label}
              </Label>
            </FormGroup>
          );
        })}
      </div>
    </>
  );
};

const Parent = props => {
  const defaultCheckedChildren = props.checkboxes.map(name => name);
  const [ checkedChildren, setCheckedChildren ] = useState(defaultCheckedChildren);

  const onChildChanged = name => {
    // create new copy because you shouldn't mutate state objects
    const newCheckedChildren = Array.from(checkedChildren);
    if (newCheckedChildren.indexOf(name) === -1) {
      newCheckedChildren.push(name);
    } else {
      newCheckedChildren.splice(newCheckedChildren.indexOf(name), 1);
    }

    setCheckedChildren(newCheckedChildren);
  };
  const onParentChange = event => {
    if (checkedChildren.length === 0) {
      setCheckedChildren(props.checkboxes.map(name => name));
    } else {
      setCheckedChildren([]);
    }
  };
  const indeterminate = checkedChildren.length > 0 && checkedChildren.length < props.checkboxes.length;

  useEffect(() => {
    if (props.reset) {
      setCheckedChildren(defaultCheckedChildren);
    }
  }, [props.reset, defaultCheckedChildren]);

  useEffect(() => {
    const isPhaseGroup = () => {
      return props.checkboxes.some(checkboxName =>
        props.checkboxConfigs[checkboxName].phase !== undefined);
    }

    if (props.phases && props.layers && isPhaseGroup()) {
      console.log('update phase queries');
      const newCheckedPhases = checkedChildren.map(checkboxName => props.checkboxConfigs[checkboxName].phase);
      const shouldBeFiltered = layerName => {
        if (!props.filterByPhasing) {
          // return false for any layerName that shows up in a checkbox that
          // is marked showFilterByPhasing = true
          return Object.values(props.allGroupConfigs).every(groupConfig => {
            if (!groupConfig.showFilterByPhasing) {
              return true;
            }

            return groupConfig.checkboxes.every(checkboxName => {
              return props.checkboxConfigs[checkboxName].layers.indexOf(layerName) === -1;
            });
          });
        }

        return true;
      }

      Object.keys(props.phases).forEach(layerName => {
        const phaseInfo = props.phases[layerName];
        const layer = props.layers[layerName];
        if (layer) {
          if (shouldBeFiltered(layerName)) {
            layer.definitionExpression = getPhaseQuery(phaseInfo, newCheckedPhases);
          } else {
            layer.definitionExpression = null;
          }
        }
      });
    }
  }, [checkedChildren, props.phases, props.layers, props.checkboxes, props.checkboxConfigs, props.filterByPhasing, props.allGroupConfigs]);

  return (
    <>
      <FormGroup check>
        <Label check>
          <input type="checkbox" className="form-check-input"
            checked={checkedChildren.length === props.checkboxes.length}
            onChange={onParentChange}
            ref={ref => ref && (ref.indeterminate = indeterminate)} />
            {props.label}
        </Label>
        { props.showFilterByPhasing &&
          <Label check>
            <Input type="checkbox"
              checked={props.filterByPhasing}
              // TODO: trigger a redraw on change
              onChange={() => props.setFilterByPhasing(!props.filterByPhasing)} />
            <small>(filter by phasing)</small>
          </Label>
        }
      </FormGroup>
      <div className="child-checkbox-container">
        { props.checkboxes.map(checkboxName => {
          const checkboxConfig = props.checkboxConfigs[checkboxName];

          return <Child key={checkboxName}
            name={checkboxName}
            {...checkboxConfig}
            onChange={onChildChanged}
            layersLookup={props.layers}
            setLayersVisibility={props.setLayersVisibility}
            checked={checkedChildren.indexOf(checkboxName) > -1} />
        }) }
      </div>
    </>
  );
};

const Child = props => {
  const [ internalIsChecked, setInternalIsChecked ] = useState(true);
  const onChange = event => {
    if (props.onChange) {
      props.onChange(props.name);
    } else {
      setInternalIsChecked(!internalIsChecked);
    }
  };

  let checked = (props.checked !== undefined) ? props.checked : internalIsChecked;

  if (props.layers) {
    props.setLayersVisibility(props.layers, checked);
  }

  let Symbol;
  if (props.symbol) {
    Symbol = SYMBOLS[props.symbol];
  }

  useEffect(() => {
    if (props.reset) {
      setInternalIsChecked(true);
    }
  }, [props.reset]);

  return (
    <FormGroup check>
      <Label check>
        <Input
          type="checkbox"
          checked={checked}
          onChange={onChange}/>
          {props.label}
      </Label>
      { props.symbol && props.layersLookup &&
      <Symbol
        layerNames={props.layers}
        layersLookup={props.layersLookup}
        phaseIndex={props.phase}
        color={props.color}
        symbolLayerIds={props.symbolLayerIds}
        staticColors={props.staticColors} /> }
    </FormGroup>
  );
};
