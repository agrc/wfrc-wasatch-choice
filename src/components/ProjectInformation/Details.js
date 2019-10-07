import React, { useState, useEffect } from 'react';
import config from '../../config';
import './Details.scss';
import { Collapse } from 'reactstrap';


export const getAliasValuePairs = (attributes, fields, excludeFields, displayField) => {
  const aliasLookup = {};
  fields.forEach(field => {
    aliasLookup[field.name] = field.alias;
  });

  return Object.keys(attributes)
    .filter(fieldName => {
      return excludeFields.concat([displayField])
        .every(testField => testField.toLowerCase() !== fieldName.toLowerCase());
    })
    .map(fieldName => [aliasLookup[fieldName], attributes[fieldName]]);
};
export default ({ feature }) => {
  const [ collapsed, setCollapsed ] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  console.log('Details feature', feature);

  const aliasValuePairs = getAliasValuePairs(feature.attributes,
    feature.layer.fields, config.projectInformation.excludeFields, feature.layer.displayField);

  useEffect(() => {
    setCollapsed(true);
  }, [feature]);

  return (
    <div className="details">
      <div className="title" onClick={toggle}>{feature.attributes[feature.layer.displayField]}</div>
      <Collapse isOpen={!collapsed} className="body">
        <div className="padder">
          <table cellPadding="0px" cellSpacing="0px">
            <tbody>
              { aliasValuePairs.map(([alias, value], index) =>
                <tr key={index}>
                  <td className="alias">{alias}</td>
                  <td className="value">{value}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </Collapse>
    </div>
  );
};
