import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter from './Filter';
import config from '../../config';


const mapViewMock = {};

const stories = storiesOf('Filter', module);
Object.keys(config.mapInfos).slice(0, 5).forEach(tabId => {
  const tabConfig = config.mapInfos[tabId];
  stories.add(tabConfig.name, () => <Filter {...tabConfig.filter} mapView={mapViewMock} />)
});
