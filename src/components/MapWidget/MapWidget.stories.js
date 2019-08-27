import React from 'react';
import { storiesOf } from '@storybook/react';
import MapWidget from './MapWidget';
import { faHandPointer, faList } from '@fortawesome/free-solid-svg-icons';


storiesOf('MapWidget', module)
  .add('Filter', () =>
    <MapWidget name="Filter"
      defaultOpen={true}
      showReset={true}
      icon={faList}>
      child widget content
    </MapWidget>
  )
  .add('Project Information', () =>
    <MapWidget name="Project Information"
      defaultOpen={true}
      icon={faHandPointer}>
      child widget content
    </MapWidget>
  )
;
