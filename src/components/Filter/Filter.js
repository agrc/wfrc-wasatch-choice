import React, { useState } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import './Filter.scss';


export default props => {
  console.log(props);
  // TODO:
  // validate layer names
  // wire up change events
  // add symbols

  return (
    <div className="filter">
      { props.groups && props.groups.map(groupConfig =>
          <div className="group-container" key={groupConfig.label}>
            <Parent {...groupConfig} checkboxConfigs={props.checkboxes} />
          </div>)
      }
      { !props.groups && Object.keys(props.checkboxes).map(checkboxName => {
        const checkboxConfig = props.checkboxes[checkboxName];

        return (
          <Child key={checkboxName}
              name={checkboxConfig.label}
              {...checkboxConfig}
              checked={true} />
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
            checked={checkedChildren.indexOf(checkboxName) > -1} />) }
      </div>
    </>
  );
};

const Child = props => {
  const onChange = event => {
    props.onChange(props.name);
  };

  return (
    <FormGroup check>
      <Label check>
        <Input type="checkbox" checked={props.checked} onChange={onChange}/> {props.label}
      </Label>
    </FormGroup>
  );
};
