import '../../App.scss';
import config from '../../config';
import Sidebar from '../Sidebar/Sidebar';
import About from './About';
import './AboutTests.scss';

const AboutTests = () => {
  return (
    <div className="about-tests">
      {Object.keys(config.mapInfos).map((tabId, index) => (
        <Sidebar isOpen={true} key={index}>
          <h3>{tabId}</h3>
          <About testTabId={tabId} />
        </Sidebar>
      ))}
    </div>
  );
};

export default AboutTests;
