import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter from './Filter';
import config from '../../config';


const mapViewMock = {};

const stories = storiesOf('Filter', module);
config.tabs.forEach(tabConfig => {
  stories.add(tabConfig.name, () => <Filter {...tabConfig.filter} mapView={mapViewMock} />)
});
