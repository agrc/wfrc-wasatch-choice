import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Collapse, Label } from 'reactstrap';
import { MapWidgetContext } from '../MapWidget/MapWidget';
import './QueryFilter.scss';
import { useMapLayers } from './utils';
import PropTypes from 'prop-types';

export const NUMBER = 'number';
export const TEXT = 'text';

export const getLayerQuery = (fieldQueries) => {
  const populatedQueries = Object.values(fieldQueries).filter((fieldQueries) => fieldQueries);

  if (populatedQueries.length === 0) {
    return null;
  }

  return `${populatedQueries.join(' AND ')}`;
};

export const getFieldQuery = (fieldName, fieldType, newState, checkboxLookup) => {
  const getValuesFromLabels = (labels) => {
    return labels
      .filter((label) => checkboxLookup[label].values) // filter out "other" checkboxes
      .map((label) => checkboxLookup[label].values)
      .flat();
  };
  const getInValues = (values) => {
    if (fieldType.toLowerCase() === NUMBER) {
      return values.join(', ');
    }

    return `'${values.join("', '")}'`;
  };

  const checkedLabels = Object.entries(newState)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, checked]) => checked)
    // eslint-disable-next-line no-unused-vars
    .map(([label, _]) => label);

  // return null if all checkboxes are checked (the default state)
  if (checkedLabels.length === Object.entries(newState).length) {
    return null;
  }

  const checkedValues = getValuesFromLabels(checkedLabels);
  const isOtherChecked = checkedLabels.some((label) => checkboxLookup[label].other);

  let expression;
  if (checkedValues.length > 0) {
    expression = `${fieldName} IN (${getInValues(checkedValues)})`;
  }

  if (isOtherChecked) {
    const allValues = getValuesFromLabels(Object.keys(checkboxLookup));

    const notInExpression = `${fieldName} NOT IN (${getInValues(allValues)})`;
    if (expression) {
      expression += ` OR ${notInExpression}`;
    } else {
      expression = notInExpression;
    }
  }

  return `(${expression})`;
};

export function QueryFilterField({ label, openOnLoad, fieldName, fieldType, checkboxes, onChange, reset }) {
  const initialState = Object.fromEntries(checkboxes.map(({ label }) => [label, true]));
  const checkboxLookup = Object.fromEntries(checkboxes.map((checkbox) => [checkbox.label, checkbox]));
  const [isOpen, setIsOpen] = React.useState(openOnLoad);
  const [state, setState] = React.useState(initialState);
  const { updateScrollbar } = React.useContext(MapWidgetContext);

  const onCheckboxChange = (label) => {
    setState((currentState) => {
      const newState = { ...currentState };

      newState[label] = !newState[label];

      return newState;
    });
  };

  React.useEffect(() => {
    onChange(label, getFieldQuery(fieldName, fieldType, state, checkboxLookup));
  }, [state, onChange, label, fieldName, fieldType, checkboxLookup]);

  React.useEffect(() => {
    if (reset) {
      setState(initialState);
    }
  }, [reset, initialState]);

  return (
    <div className="query-filter-field">
      <Button color="link" onClick={() => setIsOpen((current) => !current)}>
        <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
        {label}
      </Button>
      <br />
      <Collapse isOpen={isOpen} onEntered={updateScrollbar} onExited={updateScrollbar}>
        <div className="field-container">
          {checkboxes.map(({ label, color }, index) => (
            <Label key={index} check>
              <input type="checkbox" checked={state[label]} onChange={() => onCheckboxChange(label)} />
              <span className="checkbox-label">{label}</span>
              {color ? <div className="swatch" style={{ backgroundColor: color }}></div> : null}
            </Label>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

QueryFilterField.propTypes = {
  label: PropTypes.string.isRequired,
  openOnLoad: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      other: PropTypes.bool,
      color: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};

const QueryFilter = ({ mapView, layerName, fields, reset }) => {
  const layersInput = React.useRef({ layerKey: layerName });
  const layers = useMapLayers(mapView, layersInput.current);
  const initialState = Object.fromEntries(fields.map((field) => [field.label, null]));
  const state = React.useRef(initialState);

  const mapLayer = layers ? layers.layerKey : null;
  const onChange = (label, newFieldQuery) => {
    state.current = {
      ...state.current,
      [label]: newFieldQuery,
    };

    updateLayerQuery(state.current);
  };

  const updateLayerQuery = React.useCallback(
    (newState) => {
      const query = getLayerQuery(newState);

      if (mapLayer && mapLayer.loaded) {
        console.log('query', query);
        mapLayer.definitionExpression = query;
      }
    },
    [mapLayer],
  );

  React.useEffect(() => {
    if (reset) {
      updateLayerQuery(initialState);
    }
  }, [reset, initialState, updateLayerQuery]);

  return (
    <div className="query-filter">
      {fields.map((field, index) => (
        <QueryFilterField key={index} {...field} reset={reset} onChange={onChange} />
      ))}
    </div>
  );
};

QueryFilter.propTypes = {
  mapView: PropTypes.object.isRequired,
  layerName: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      fieldName: PropTypes.string.isRequired,
      fieldType: PropTypes.string.isRequired,
      checkboxes: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
          other: PropTypes.bool,
          color: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
  reset: PropTypes.bool,
};

export default QueryFilter;
