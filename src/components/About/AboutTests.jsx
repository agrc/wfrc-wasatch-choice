import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import About from './About';
import config from '../../config';
import './AboutTests.scss';
import '../../App.scss';


const AboutTests = () => {
  return (
    <div className="about-tests">
      { Object.keys(config.mapInfos).map((tabId, index) =>
        <Sidebar isOpen={true} key={index}>
          <h3>{tabId}</h3>
          <About testTabId={tabId}/>
        </Sidebar>
      ) }
    </div>
  );
};

export default AboutTests;
