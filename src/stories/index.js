import React from 'react';

import { storiesOf } from '@storybook/react';
import Filter from '../components/Filter/Filter';
import '../setupTests';
import config from '../config';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';


const mapViewMock = {

};

const stories = storiesOf('Filter', module);
config.tabs.forEach(tabConfig => {
  stories.add(tabConfig.name, () => <Filter {...tabConfig.filter} mapView={mapViewMock} />)
});
