import Details from './Details';

export default {
  title: 'Details',
  component: Details,
};

const feature = {
  attributes: {
    fieldOne: 'display field value',
    fieldTwo: 'hello',
    fieldThree: 'world',
  },
  layer: {
    fields: [
      {
        name: 'fieldOne',
        alias: 'Field One',
      },
      {
        name: 'fieldTwo',
        alias: 'Field Two',
      },
      {
        name: 'fieldThree',
        alias: 'Field Three',
      },
    ],
    displayField: 'fieldOne',
  },
};

export const Default = () => <Details feature={feature} />;
