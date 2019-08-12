import React, { useState } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import './Filter.scss';


export const getLayers = (layerNames, map) => {
  console.log('Filter.getLayers');

  const layerNameLookup = {};

  map.layers.forEach(layer => {
    layerNameLookup[layer.title] = layer;
  });
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

export default props => {
  console.log(props);
  // TODO:
  // add symbols

  let layers;
  // only get new layers if after the map has been updated to match the current tab
  if (props.mapView && props.mapView.map && props.webMapId === props.mapView.map.portalItem.id) {
    console.log(props.mapView.map.portalItem.id, props.mapView.map.loaded);
    props.mapView.map.when(() => {
      layers = getLayers(props.layerNames, props.mapView.map);
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
            <Parent {...groupConfig}
              checkboxConfigs={props.checkboxes}
              setLayersVisibility={setLayersVisibility} />
          </div>)
      }
      { !props.groups && Object.keys(props.checkboxes).map(checkboxName => {
        const checkboxConfig = props.checkboxes[checkboxName];

        return (
          <Child key={checkboxName}
              name={checkboxConfig.label}
              {...checkboxConfig}
              setLayersVisibility={setLayersVisibility} />
        );
      }) }
    </div>
  );
};

const Parent = props => {
  const [ checkedChildren, setCheckedChildren ] = useState(props.checkboxes.map(name => name));
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
      </FormGroup>
      <div className="child-checkbox-container">
        { props.checkboxes.map(checkboxName =>
          <Child key={checkboxName}
            name={checkboxName}
            {...props.checkboxConfigs[checkboxName]}
            onChange={onChildChanged}
            setLayersVisibility={props.setLayersVisibility}
            checked={checkedChildren.indexOf(checkboxName) > -1} />) }
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
  props.setLayersVisibility(props.layers, checked);

  return (
    <FormGroup check>
      <Label check>
        <Input
          type="checkbox"
          checked={checked}
          onChange={onChange}/> {props.label}
      </Label>
    </FormGroup>
  );
};
