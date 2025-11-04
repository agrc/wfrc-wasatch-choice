import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, FormGroup, Input, Label } from 'reactstrap';
import { useSpecialTranslation } from '../../i18n';
import './Filter.scss';
import { Classes, Image, Simple, Swatch } from './Symbols';
import { useMapLayers } from './utils';

const SYMBOLS = {
  simple: Simple,
  classes: Classes,
  swatch: Swatch,
  image: Image,
};

// used to preserve control state between tabs
const CACHE = {};

export const getQuery = (queryInfo, checkedIndexes) => {
  // translate the phase info into a definition query taking into account the selected phases

  if (!checkedIndexes) return null;

  const showNoneQuery = '1 = 2';
  if (checkedIndexes.length === 0) {
    return showNoneQuery;
  } else if (checkedIndexes.length === 4) {
    return null;
  }

  const filter = (_, i) => {
    return checkedIndexes.includes(i);
  };
  const removeDuplicates = (inStatement) => {
    return [...new Set(inStatement.split(joinTxt))].join(joinTxt);
  };
  const wrapWithQuotes = (text) => {
    return `'${text}'`;
  };
  const isStringQuery = typeof queryInfo[1] === 'string';

  let joinTxt = ', ';
  if (isStringQuery) {
    joinTxt = wrapWithQuotes(joinTxt);
  }
  let queryValues = removeDuplicates(
    queryInfo.slice(1).filter(filter).join(joinTxt),
  );
  if (queryValues.length === 0) {
    return showNoneQuery;
  }
  if (isStringQuery) {
    queryValues = wrapWithQuotes(queryValues);
  }

  return `${queryInfo[0]} IN (${queryValues})`;
};

export const validateCheckboxLayerKeys = (layerNames, checkboxes) => {
  console.log('Filter.validateCheckboxLayerKeys');

  const layerKeys = Object.keys(layerNames);
  Object.keys(checkboxes).forEach((checkboxKey) => {
    if (checkboxes[checkboxKey].layerNames) {
      checkboxes[checkboxKey].layerNames.forEach((layerKey) => {
        if (layerKeys.indexOf(layerKey) === -1) {
          console.error(
            `Cannot find layer: ${layerKey} from checkbox: ${checkboxKey}`,
          );
        }
      });
    }
  });
};

export default function Filter({
  checkboxes,
  groups,
  layerNames,
  mapView,
  modes,
  phases,
  reset,
  toggle,
  webMapId,
}) {
  const [filterByPhasing, setFilterByPhasing] = useState(false);
  const layers = useMapLayers(mapView, layerNames);
  const [selectedModes, setSelectedModes] = useState(
    modes && modes[Object.keys(modes)[0]].slice(1),
  );
  const [selectedPhases, setSelectedPhases] = useState(
    phases && phases[Object.keys(modes)[0]].slice(1),
  );
  const [colorBy, setColorBy] = useState('mode');
  const t = useSpecialTranslation();

  useEffect(() => {
    if ((phases || modes) && layers) {
      const shouldBeFilteredByPhase = (layerName) => {
        if (!filterByPhasing) {
          // does this layer show up in a group with a filter by phase checkbox that is checked?
          return Object.values(groups).every((groupConfig) => {
            // if the group doesn't have a filter by phase checkbox, then we filter
            if (!groupConfig.showFilterByPhasing) {
              return true;
            }

            // make sure that it's not in this group
            return groupConfig.checkboxes.indexOf(layerName) === -1;
          });
        }

        return true;
      };

      new Set(Object.keys(phases).concat(Object.keys(modes))).forEach(
        (layerName) => {
          const layer = layers[layerName];
          if (layer) {
            let definitionExpression = layer.defaultDefinitionExpression;
            if (shouldBeFilteredByPhase(layerName)) {
              const phaseQuery = getQuery(phases[layerName], selectedPhases);
              if (phaseQuery) {
                definitionExpression = `(${definitionExpression}) AND (${phaseQuery})`;
              }
            }

            if (modes[layerName]) {
              const modeQuery = getQuery(modes[layerName], selectedModes);
              if (modeQuery) {
                definitionExpression = `(${definitionExpression}) AND (${modeQuery})`;
              }
            }

            layer.definitionExpression = definitionExpression;
          }
        },
      );
    }
  }, [
    checkboxes.layerNames,
    filterByPhasing,
    groups,
    layers,
    modes,
    phases,
    selectedModes,
    selectedPhases,
  ]);

  const mapIsLoaded = () => {
    return (
      mapView &&
      mapView.map &&
      mapView.map.loaded &&
      mapView.map.portalItem.id === webMapId
    );
  };

  useEffect(() => {
    validateCheckboxLayerKeys(layerNames, checkboxes);
  }, [layerNames, checkboxes]);

  const setLayersVisibility = (layerNames, visible) => {
    if (layers) {
      layerNames.forEach((key) => {
        const layer = layers[key];
        if (layer) {
          layer.visible = visible;
        }
      });
    }
  };

  const filterByPhasingCacheProperty = `${webMapId}_filterByPhasing`;
  const setFilterByPhasingWrapper = (value, skipCache) => {
    if (!skipCache) {
      CACHE[filterByPhasingCacheProperty] = value;
    }

    setFilterByPhasing(value);
  };
  const filterByPhasingCachedValue = CACHE[filterByPhasingCacheProperty];
  if (
    filterByPhasingCachedValue !== undefined &&
    filterByPhasingCachedValue !== filterByPhasing
  ) {
    setFilterByPhasingWrapper(!filterByPhasing, true);
  }

  useEffect(() => {
    if (!layers || !toggle) return;

    const visibleLayerKeys =
      colorBy === 'mode' ? toggle.modeLayers : toggle.phaseLayers;
    for (const configLayerKey of toggle.modeLayers.concat(toggle.phaseLayers)) {
      const layer = layers[configLayerKey];

      if (layer) layer.visible = visibleLayerKeys.includes(configLayerKey);
    }
  }, [
    colorBy,
    layerNames,
    layers,
    toggle,
    toggle?.modeLayers,
    toggle?.phaseLayers,
  ]);

  return (
    <div className="filter">
      {toggle ? (
        <>
          <div className="mb-2 d-flex align-items-center">
            <Label className="mb-0 me-2">{t(toggle.label)}</Label>
            <ButtonGroup>
              <Button
                active={colorBy === 'mode'}
                color={colorBy === 'mode' ? 'primary' : 'secondary'}
                onClick={() => setColorBy('mode')}
                size="sm"
              >
                {t(toggle.mode)}
              </Button>
              <Button
                active={colorBy === 'phase'}
                color={colorBy === 'phase' ? 'primary' : 'secondary'}
                onClick={() => setColorBy('phase')}
                size="sm"
              >
                {t(toggle.phase)}
              </Button>
            </ButtonGroup>
          </div>
        </>
      ) : null}
      {groups &&
        groups.map((groupConfig) => {
          const globalKey = `${webMapId}_${groupConfig.label}`;

          return (
            <div className="group-container" key={groupConfig.label}>
              {groupConfig.radio ? (
                <RadioGroup
                  {...groupConfig}
                  key={globalKey}
                  globalKey={globalKey}
                  webMapId={webMapId}
                  reset={reset}
                  checkboxConfigs={checkboxes}
                  setLayersVisibility={setLayersVisibility}
                  layers={mapIsLoaded() ? layers : null}
                />
              ) : (
                <Parent
                  {...groupConfig}
                  colorBy={colorBy}
                  key={globalKey}
                  globalKey={globalKey}
                  reset={reset}
                  webMapId={webMapId}
                  checkboxConfigs={checkboxes}
                  setLayersVisibility={setLayersVisibility}
                  filterByPhasing={filterByPhasing}
                  setFilterByPhasing={setFilterByPhasingWrapper}
                  layers={mapIsLoaded() ? layers : null}
                  phases={phases}
                  allGroupConfigs={groups}
                  selectedModes={selectedModes}
                  setSelectedModes={setSelectedModes}
                  selectedPhases={selectedPhases}
                  setSelectedPhases={setSelectedPhases}
                />
              )}
            </div>
          );
        })}
      {!groups &&
        Object.keys(checkboxes).map((checkboxName) => {
          const checkboxConfig = checkboxes[checkboxName];

          return (
            <Child
              key={checkboxName}
              globalKey={`${webMapId}_${checkboxName}`}
              name={checkboxConfig.label}
              reset={reset}
              {...checkboxConfig}
              layersLookup={mapIsLoaded() ? layers : null}
              setLayersVisibility={setLayersVisibility}
            />
          );
        })}
    </div>
  );
}

Filter.propTypes = {
  checkboxes: PropTypes.object.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object),
  layerNames: PropTypes.object.isRequired,
  mapView: PropTypes.object,
  modes: PropTypes.object,
  phases: PropTypes.object,
  reset: PropTypes.bool.isRequired,
  toggle: PropTypes.object,
  webMapId: PropTypes.string.isRequired,
};

const RadioGroup = ({
  checkboxConfigs,
  checkboxes,
  globalKey,
  label,
  layers,
  reset,
  setLayersVisibility,
}) => {
  const [visible, setVisible] = useState(false);
  const defaultRadioButton = checkboxes[0];
  const [selectedRadioButton, setSelectedRadioButton] =
    useState(defaultRadioButton);
  const t = useSpecialTranslation();

  const selectedRadioButtonCachedProperty = `${globalKey}_selectedRadioButton`;
  const onRadioChange = (checkboxName, skipCache) => {
    if (!skipCache) {
      CACHE[selectedRadioButtonCachedProperty] = checkboxName;
    }

    setSelectedRadioButton(checkboxName);
  };

  const selectedRadioButtonCachedValue =
    CACHE[selectedRadioButtonCachedProperty];
  if (
    selectedRadioButtonCachedValue !== undefined &&
    selectedRadioButtonCachedValue !== selectedRadioButton
  ) {
    onRadioChange(selectedRadioButtonCachedValue, true);
  }

  const allLayerKeys = checkboxes.reduce(
    (layerNames, checkboxName) =>
      layerNames.concat(checkboxConfigs[checkboxName].layerNames),
    [],
  );
  const visibleLayerKeys = visible
    ? checkboxConfigs[selectedRadioButton].layerNames
    : [];
  const hiddenLayersKeys = allLayerKeys.filter(
    (key) => visibleLayerKeys.indexOf(key) === -1,
  );
  setLayersVisibility(hiddenLayersKeys, false);
  setLayersVisibility(visibleLayerKeys, true);

  useEffect(() => {
    if (reset) {
      setVisible(true);
      setSelectedRadioButton(defaultRadioButton);
    }
  }, [reset, defaultRadioButton]);

  const visibleCacheProperty = `${globalKey}_visible`;
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
          <Input type="checkbox" checked={visible} onChange={onToggleVisible} />
          {t(label)}
        </Label>
      </FormGroup>
      <div className="child-checkbox-container">
        {checkboxes.map((checkboxName) => {
          const checkboxConfig = checkboxConfigs[checkboxName];
          const Symbol = checkboxConfig.symbol
            ? SYMBOLS[checkboxConfig.symbol]
            : null;

          return (
            <FormGroup check key={checkboxName}>
              <Label check>
                <Input
                  type="radio"
                  name={label}
                  checked={selectedRadioButton === checkboxName}
                  onChange={() => onRadioChange(checkboxName)}
                />
                {t(checkboxConfig.label)}
              </Label>
              {checkboxConfig.symbol && layers && (
                <Symbol
                  layerNames={checkboxConfig.layerNames}
                  layersLookup={layers}
                  imageFileName={checkboxConfig.symbolImageFile}
                  symbolLayerIds={checkboxConfig.symbolLayerIds}
                  symbolLayerNames={checkboxConfig.symbolLayerNames}
                  symbolLabels={checkboxConfig.symbolLabels}
                />
              )}
            </FormGroup>
          );
        })}
      </div>
    </>
  );
};

RadioGroup.propTypes = {
  checkboxConfigs: PropTypes.object.isRequired,
  checkboxes: PropTypes.arrayOf(PropTypes.string).isRequired,
  globalKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  layers: PropTypes.object,
  reset: PropTypes.bool,
  setLayersVisibility: PropTypes.func.isRequired,
};

const Parent = ({
  checkboxConfigs,
  checkboxes,
  colorBy,
  filterByPhasing,
  globalKey,
  label,
  layers,
  reset,
  setFilterByPhasing,
  setLayersVisibility,
  setSelectedModes,
  setSelectedPhases,
  showFilterByPhasing,
}) => {
  const defaultCheckedChildren = checkboxes.filter(
    (name) => !checkboxConfigs[name].offByDefault,
  );
  const [checkedChildren, setCheckedChildren] = useState(
    defaultCheckedChildren,
  );
  const t = useSpecialTranslation();

  useEffect(() => {
    if (
      checkboxes.every(
        (name) =>
          checkboxConfigs[name].mode === undefined &&
          checkboxConfigs[name].phase === undefined,
      )
    )
      return;

    setSelectedModes(
      checkedChildren
        .filter((name) => checkboxConfigs[name].mode !== undefined)
        .map((name) => checkboxConfigs[name].mode),
    );
    setSelectedPhases(
      checkedChildren
        .filter((name) => checkboxConfigs[name].phase !== undefined)
        .map((name) => checkboxConfigs[name].phase),
    );
  }, [
    checkboxConfigs,
    checkboxes,
    checkedChildren,
    setSelectedModes,
    setSelectedPhases,
  ]);

  const onChildChanged = (name) => {
    // create new copy because you shouldn't mutate state objects
    const newCheckedChildren = Array.from(checkedChildren);

    if (newCheckedChildren.indexOf(name) === -1) {
      newCheckedChildren.push(name);
    } else {
      newCheckedChildren.splice(newCheckedChildren.indexOf(name), 1);
    }

    CACHE[globalKey] = newCheckedChildren;

    setCheckedChildren(newCheckedChildren);
  };

  const onParentChange = () => {
    const newCheckedChildren =
      checkedChildren.length === 0 ? checkboxes.map((name) => name) : [];

    CACHE[globalKey] = newCheckedChildren;

    setCheckedChildren(newCheckedChildren);
  };
  const indeterminate =
    checkedChildren.length > 0 && checkedChildren.length < checkboxes.length;

  useEffect(() => {
    if (reset) {
      delete CACHE[globalKey];

      setCheckedChildren(defaultCheckedChildren);
    }
  }, [reset, defaultCheckedChildren, globalKey]);

  const cachedCheckedChildren = CACHE[globalKey];
  if (
    cachedCheckedChildren !== undefined &&
    JSON.stringify(cachedCheckedChildren) !== JSON.stringify(checkedChildren)
  ) {
    setCheckedChildren(cachedCheckedChildren);
  }

  return (
    <>
      <FormGroup check>
        <Label check>
          <input
            type="checkbox"
            className="form-check-input"
            checked={checkedChildren.length === checkboxes.length}
            onChange={onParentChange}
            ref={(ref) => ref && (ref.indeterminate = indeterminate)}
          />
          {t(label)}
        </Label>
        {showFilterByPhasing && (
          <Label check>
            <Input
              type="checkbox"
              checked={filterByPhasing}
              onChange={() => setFilterByPhasing(!filterByPhasing)}
            />
            <small>{`(${t('trans:filterByPhasing')})`}</small>
          </Label>
        )}
      </FormGroup>
      <div className="child-checkbox-container">
        {checkboxes.map((checkboxName) => {
          const checkboxConfig = checkboxConfigs[checkboxName];
          const modeOrPhase =
            checkboxConfig.mode !== undefined
              ? 'mode'
              : checkboxConfig.phase !== undefined
                ? 'phase'
                : null;

          return (
            <Child
              hideSymbol={modeOrPhase && colorBy !== modeOrPhase}
              key={checkboxName}
              manageLayerVisibility={
                checkboxConfig.mode === undefined &&
                checkboxConfig.phase === undefined
              }
              name={checkboxName}
              {...checkboxConfig}
              onChange={onChildChanged}
              layersLookup={layers}
              setLayersVisibility={setLayersVisibility}
              checked={checkedChildren.indexOf(checkboxName) > -1}
            />
          );
        })}
      </div>
    </>
  );
};

Parent.propTypes = {
  allGroupConfigs: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkboxConfigs: PropTypes.object.isRequired,
  checkboxes: PropTypes.arrayOf(PropTypes.string).isRequired,
  colorBy: PropTypes.string,
  filterByPhasing: PropTypes.bool,
  globalKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  layers: PropTypes.object,
  reset: PropTypes.bool,
  setFilterByPhasing: PropTypes.func,
  setLayersVisibility: PropTypes.func.isRequired,
  setSelectedModes: PropTypes.func,
  setSelectedPhases: PropTypes.func,
  showFilterByPhasing: PropTypes.bool,
};

function Child({
  color,
  checked: checkedProp,
  globalKey,
  label,
  layerNames,
  layersLookup,
  manageLayerVisibility = true,
  name,
  offByDefault,
  onChange,
  reset,
  hideSymbol,
  setLayersVisibility,
  staticColors,
  symbol,
  symbolImageFile,
  symbolLabels,
  symbolLayerNames,
}) {
  const [internalIsChecked, setInternalIsChecked] = useState(!offByDefault);
  const t = useSpecialTranslation();

  const onCheckboxChange = ({ skipCache }) => {
    if (!skipCache && globalKey) {
      CACHE[globalKey] =
        checkedProp !== undefined ? !checkedProp : !internalIsChecked;
    }

    if (onChange) {
      onChange(name);
    } else {
      setInternalIsChecked(!internalIsChecked);
    }
  };

  let checked = checkedProp !== undefined ? checkedProp : internalIsChecked;

  // we only cache at the child level for stand-alone checkboxes
  if (globalKey) {
    const cachedValue = CACHE[globalKey];
    if (cachedValue !== undefined && cachedValue !== checked) {
      if (onChange) onChange({ skipCache: true });
    }
  }

  if (layerNames && manageLayerVisibility) {
    setLayersVisibility(layerNames, checked);
  }

  const Symbol = symbol ? SYMBOLS[symbol] : null;

  useEffect(() => {
    if (reset) {
      setInternalIsChecked(!offByDefault);
    }
  }, [reset, offByDefault]);

  return (
    <FormGroup check>
      <Label check>
        <Input type="checkbox" checked={checked} onChange={onCheckboxChange} />
        {t(label)}
      </Label>
      {!hideSymbol && symbol && layersLookup && (
        <Symbol
          layerNames={layerNames}
          layersLookup={layersLookup}
          color={color}
          symbolLayerNames={symbolLayerNames}
          symbolLabels={symbolLabels}
          imageFileName={symbolImageFile}
          staticColors={staticColors}
        />
      )}
    </FormGroup>
  );
}

Child.propTypes = {
  color: PropTypes.string,
  checked: PropTypes.bool,
  globalKey: PropTypes.string,
  hideSymbol: PropTypes.bool,
  label: PropTypes.string.isRequired,
  layerNames: PropTypes.arrayOf(PropTypes.string),
  layersLookup: PropTypes.object,
  manageLayerVisibility: PropTypes.bool,
  name: PropTypes.string.isRequired,
  offByDefault: PropTypes.bool,
  onChange: PropTypes.func,
  reset: PropTypes.bool,
  setLayersVisibility: PropTypes.func,
  staticColors: PropTypes.arrayOf(PropTypes.object),
  symbol: PropTypes.string,
  symbolImageFile: PropTypes.string,
  symbolLabels: PropTypes.arrayOf(PropTypes.string),
  symbolLayerNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
