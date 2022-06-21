import { faHandPointer, faList } from '@fortawesome/free-solid-svg-icons';
import MapWidget from './MapWidget';

export default {
  title: 'MapWidget',
  component: MapWidget,
};

export const Filter = () => (
  <MapWidget name="Filter" defaultOpen={true} showReset={true} icon={faList}>
    child widget content
  </MapWidget>
);

export const ProjectInformation = () => (
  <MapWidget name="Project Information" defaultOpen={true} icon={faHandPointer}>
    child widget content
  </MapWidget>
);
