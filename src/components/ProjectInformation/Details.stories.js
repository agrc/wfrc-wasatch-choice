import React from 'react';
import { storiesOf } from '@storybook/react';
import Details from './Details';


const feature = {
  attributes: {
    fieldOne: 'display field value',
    fieldTwo: 'hello',
    fieldThree: 'world'
  },
  layer: {
    fields: [{
      name: 'fieldOne',
      alias: 'Field One'
    }, {
      name: 'fieldTwo',
      alias: 'Field Two'
    }, {
      name: 'fieldThree',
      alias: 'Field Three'
    }],
    displayField: 'fieldOne'
  }
};

storiesOf('Details', module)
  .add('default', () => <Details feature={feature} />)
;
