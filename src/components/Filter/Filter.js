import React, { useState, useEffect } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import './Filter.scss';
import { loadModules} from 'esri-loader';
import config from '../../config';
import { Simple, Classes, LinePoint, Phase, Dynamic } from './Symbols';


const SYMBOLS = {
  simple: Simple,
  classes: Classes,
  linePoint: LinePoint,
  phase: Phase,
  dynamic: Dynamic
};

// used to preserve control state between tabs
const CACHE = {};

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
  console.log('Filter.validateCheckboxLayerKeys');

  const layerKeys = Object.keys(layerNames);
  Object.keys(checkboxes).forEach(checkboxKey => {
    if (checkboxes[checkboxKey].layerNames) {
      checkboxes[checkboxKey].layerNames.forEach(layerKey => {
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

  // reset layer lookup when the web map is changed
  useEffect(() => {
    const getLayersForNewMap = async () => {
      const [ watchUtils ] = await loadModules(['esri/core/watchUtils'], config.ESRI_LOADER_CONFIG);
      await watchUtils.whenOnce(props.mapView, "ready");
      await props.mapView.map.when();

      const layers = await getLayers(props.layerNames, props.mapView.map);
      setLayers(layers);
    };

    if (props.mapView) {
      setLayers();
      getLayersForNewMap();
    }
  }, [props.layerNames, props.mapView]);

  const mapIsLoaded = () => {
    return props.mapView && props.mapView.map && props.mapView.map.loaded && props.mapView.map.portalItem.id === props.webMapId;
  };

  useEffect(() => {
    validateCheckboxLayerKeys(props.layerNames, props.checkboxes);
  }, [props.layerNames, props.checkboxes]);

  const setLayersVisibility = (layerNames, visible) => {
    if (layers) {
      layerNames.forEach(key => {
        const layer = layers[key];
        if (layer) {
          layer.visible = visible;
        }
      });
    }
  };

  const filterByPhasingCacheProperty = `${props.webMapId}_filterByPhasing`;
  const setFilterByPhasingWrapper = (value, skipCache) => {
    if (!skipCache) {
      CACHE[filterByPhasingCacheProperty] = value;
    }

    setFilterByPhasing(value);
  }
  const filterByPhasingCachedValue = CACHE[filterByPhasingCacheProperty];
  if (filterByPhasingCachedValue !== undefined && filterByPhasingCachedValue !== filterByPhasing) {
    setFilterByPhasingWrapper(!filterByPhasing, true);
  }

  return (
    <div className="filter">
      { props.groups && props.groups.map(groupConfig => {
          const globalKey = `${props.webMapId}_${groupConfig.label}`;

          return <div className="group-container" key={groupConfig.label}>
            { (groupConfig.radio) ?
              <RadioGroup {...groupConfig}
                key={globalKey}
                globalKey={globalKey}
                webMapId={props.webMapId}
                reset={props.reset}
                checkboxConfigs={props.checkboxes}
                setLayersVisibility={setLayersVisibility}
                layers={mapIsLoaded() ? layers : null} /> :
              <Parent {...groupConfig}
                key={globalKey}
                globalKey={globalKey}
                reset={props.reset}
                webMapId={props.webMapId}
                checkboxConfigs={props.checkboxes}
                setLayersVisibility={setLayersVisibility}
                filterByPhasing={filterByPhasing}
                setFilterByPhasing={setFilterByPhasingWrapper}
                layers={mapIsLoaded() ? layers : null}
                phases={props.phases}
                allGroupConfigs={props.groups} /> }
          </div>
        })
      }
      { !props.groups && Object.keys(props.checkboxes).map(checkboxName => {
        const checkboxConfig = props.checkboxes[checkboxName];

        return (
          <Child key={checkboxName}
              globalKey={`${props.webMapId}_${checkboxName}`}
              name={checkboxConfig.label}
              reset={props.reset}
              {...checkboxConfig}
              layersLookup={mapIsLoaded() ? layers : null}
              setLayersVisibility={setLayersVisibility} />
        );
      }) }
    </div>
  );
};

const RadioGroup = props => {
  const [ visible, setVisible ] = useState(false);
  const defaultRadioButton = props.checkboxes[0];
  const [ selectedRadioButton, setSelectedRadioButton ] = useState(defaultRadioButton);

  const selectedRadioButtonCachedProperty = `${props.globalKey}_selectedRadioButton`;
  const onRadioChange = (checkboxName, skipCache) => {
    if (!skipCache) {
      CACHE[selectedRadioButtonCachedProperty] = checkboxName;
    }

    setSelectedRadioButton(checkboxName);
  };

  const selectedRadioButtonCachedValue = CACHE[selectedRadioButtonCachedProperty];
  if (selectedRadioButtonCachedValue !== undefined && selectedRadioButtonCachedValue !== selectedRadioButton) {
    onRadioChange(selectedRadioButtonCachedValue, true);
  }

  const allLayerKeys = props.checkboxes
    .reduce((layerNames, checkboxName) => layerNames.concat(props.checkboxConfigs[checkboxName].layerNames), []);
  const visibleLayerKeys = (visible) ? props.checkboxConfigs[selectedRadioButton].layerNames : [];
  const hiddenLayersKeys = allLayerKeys.filter(key => visibleLayerKeys.indexOf(key) === -1);
  props.setLayersVisibility(hiddenLayersKeys, false);
  props.setLayersVisibility(visibleLayerKeys, true);

  useEffect(() => {
    if (props.reset) {
      setVisible(true);
      setSelectedRadioButton(defaultRadioButton);
    }
  }, [props.reset, defaultRadioButton]);

  const visibleCacheProperty = `${props.globalKey}_visible`;
  const onToggleVisible = ({ skipCache }) => {
    if (!skipCache) {
      CACHE[visibleCacheProperty] = !visible;
    }

    setVisible(!visible);
  };

  const visibleCacheValue = CACHE[visibleCacheProperty];
  if (visibleCacheValue !== undefined && visibleCacheValue !== visible) {
    onToggleVisible({ skipCache: true });
  }

  return (
    <>
      <FormGroup check>
        <Label check>
          <Input type="checkbox"
            checked={visible}
            onChange={onToggleVisible} />
          {props.label}
        </Label>
      </FormGroup>
      <div className="child-checkbox-container">
        {props.checkboxes.map(checkboxName => {
          const checkboxConfig = props.checkboxConfigs[checkboxName];
          const Symbol = (checkboxConfig.symbol) ? SYMBOLS[checkboxConfig.symbol] : null;

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
              { checkboxConfig.symbol && props.layers &&
                <Symbol
                  layerNames={checkboxConfig.layerNames}
                  layersLookup={props.layers} /> }
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

    CACHE[props.globalKey] = newCheckedChildren;

    setCheckedChildren(newCheckedChildren);
  };
  const onParentChange = event => {
    const newCheckedChildren = (checkedChildren.length === 0) ? props.checkboxes.map(name => name) : [];

    CACHE[props.globalKey] = newCheckedChildren;

    setCheckedChildren(newCheckedChildren);
  };
  const indeterminate = checkedChildren.length > 0 && checkedChildren.length < props.checkboxes.length;

  useEffect(() => {
    if (props.reset) {
      delete CACHE[props.globalKey];

      setCheckedChildren(defaultCheckedChildren);
    }
  }, [props.reset, defaultCheckedChildren, props.globalKey]);

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
              return props.checkboxConfigs[checkboxName].layerNames.indexOf(layerName) === -1;
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

  const cachedCheckedChildren = CACHE[props.globalKey];
  if (cachedCheckedChildren !== undefined &&
    JSON.stringify(cachedCheckedChildren) !== JSON.stringify(checkedChildren)) {
    setCheckedChildren(cachedCheckedChildren);
  }

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

  const onChange = ({ skipCache }) => {
    if (!skipCache && props.globalKey) {
      CACHE[props.globalKey] = (props.checked !== undefined) ? !props.checked : !internalIsChecked;
    }

    if (props.onChange) {
      props.onChange(props.name);
    } else {
      setInternalIsChecked(!internalIsChecked);
    }
  };

  let checked = (props.checked !== undefined) ? props.checked : internalIsChecked;

  // we only cache at the child level for stand-alone checkboxes
  if (props.globalKey) {
    const cachedValue = CACHE[props.globalKey];
    if (cachedValue !== undefined && cachedValue !== checked) {
      onChange({ skipCache: true });
    }
  }

  if (props.layerNames) {
    props.setLayersVisibility(props.layerNames, checked);
  }

  const Symbol = (props.symbol) ? SYMBOLS[props.symbol] : null;

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
        layerNames={props.layerNames}
        layersLookup={props.layersLookup}
        phaseIndex={props.phase}
        color={props.color}
        symbolLayerIds={props.symbolLayerIds}
        symbolLabels={props.symbolLabels}
        staticColors={props.staticColors} /> }
    </FormGroup>
  );
};
