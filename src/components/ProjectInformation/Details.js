import React, { useState } from 'react';
import config from '../../config';
import './Details.scss';
import { Collapse } from 'reactstrap';


export const getAliasValuePairs = (attributes, fields, excludeFields, displayField) => {
  const aliasLookup = {};
  fields.forEach(field => {
    aliasLookup[field.name] = field.alias;
  });

  return Object.keys(attributes)
    .filter(fieldName => !excludeFields.concat([displayField]).includes(fieldName))
    .map(fieldName => [aliasLookup[fieldName], attributes[fieldName]]);
};
export default ({ feature }) => {
  const [ collapsed, setCollapsed ] = useState(true);
  const toggle = () => setCollapsed(!collapsed);

  const aliasValuePairs = getAliasValuePairs(feature.attributes,
    feature.layer.fields, config.projectInformation.excludeFields, feature.layer.displayField);

  return (
    <div className="details">
      <div className="title" onClick={toggle}>{feature.attributes[feature.layer.displayField]}</div>
      <Collapse isOpen={!collapsed} className="body">
        <div className="padder">
          <table cellPadding="0px" cellSpacing="0px">
            <tbody>
              { aliasValuePairs.map(([alias, value]) =>
                <tr key={alias}>
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
