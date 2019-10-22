import React from 'react';
import Details from './Details';
import './ProjectInformation.scss';
import Loader from 'react-loader-spinner';


export default ({ graphics, showLoader, mapView }) => {
  console.log('ProjectInformation');

  return (
    <div className="project-information">
      { graphics.length === 0 && <p>Click on a feature for more information</p> }
      { showLoader && <Loader type="Oval" className="loader" /> }
      { graphics.map((graphic, index) => <Details key={index} graphic={graphic} />) }
    </div>
  );
};
