import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter from './Filter';
import config, { getCurrentTabIds } from '../../config';


const mapViewMock = {};

const stories = storiesOf('Filter', module);
getCurrentTabIds().forEach(tabId => {
  const tabConfig = config.tabInfos[tabId];
  stories.add(tabConfig.name, () => <Filter {...tabConfig.filter} mapView={mapViewMock} />)
});
