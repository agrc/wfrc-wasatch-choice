import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter from './Filter';
import config from '../../config';


const mapViewMock = {};

const stories = storiesOf('Filter', module);
Object.keys(config.tabInfos).slice(0, 5).forEach(tabId => {
  const tabConfig = config.tabInfos[tabId];
  stories.add(tabConfig.name, () => <Filter {...tabConfig.filter} mapView={mapViewMock} />)
});
