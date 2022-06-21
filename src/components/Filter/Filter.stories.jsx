import config from '../../config';
import Filter from './Filter';

const mapViewMock = {
  watch: () => {},
};

const stories = { title: 'Filter' };
export default stories;

const infos = Object.keys(config.mapInfos)
  .slice(0, 5)
  .map((tabId) => config.mapInfos[tabId]);

export const FirstMap = () => <Filter {...infos[0].filter} mapView={mapViewMock} />;
export const SecondMap = () => <Filter {...infos[1].filter} mapView={mapViewMock} />;
export const ThirdMap = () => <Filter {...infos[2].filter} mapView={mapViewMock} />;
export const FourthMap = () => <Filter {...infos[3].filter} mapView={mapViewMock} />;
export const FifthMap = () => <Filter {...infos[4].filter} mapView={mapViewMock} />;
