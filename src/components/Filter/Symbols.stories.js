import React from 'react';
import { storiesOf } from '@storybook/react';
import { PolygonClasses } from './Symbols';


const layersLookup = {
  layerOne: {
    renderer: {
      uniqueValueInfos: [{
        label: 'Metropolitan Center',
        symbol: {
          color: {
            a: 1,
            b: 33,
            g: 100,
            r: 235
          }
        }
      }, {
        label: 'Urban Center',
        symbol: {
          color: {
            a: 1,
            b: 46,
            g: 144,
            r: 230
          }
        }
      }, {
        label: 'City Center',
        symbol: {
          color: {
            a: 1,
            b: 38,
            g: 183,
            r: 255
          }
        }
      }, {
        label: 'Neighborhood Center',
        symbol: {
          color: {
            a: 1,
            b: 153,
            g: 219,
            r: 255
          }
        }
      }]
    }
  },
  layerTwo: {}
};
const layerNames = ['layerOne'];
storiesOf('Symbols', module)
  .add('PolygonClasses', () =>
    <PolygonClasses layersLookup={layersLookup} layerNames={layerNames} />)
;
