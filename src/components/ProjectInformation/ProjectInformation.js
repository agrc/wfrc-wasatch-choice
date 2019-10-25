import React from 'react';
import Details from './Details';
import './ProjectInformation.scss';
import Loader from 'react-loader-spinner';


export default props => {
  console.log('ProjectInformation');

  return (
    <div className="project-information">
      { props.graphics.length === 0 && !props.showLoader &&
        <p>Click on a feature for more information</p> }
      { props.showLoader && <Loader type="Oval" className="loader" /> }
      { props.graphics.map((graphic, index) =>
        <Details key={index} graphic={graphic} highlightGraphic={props.highlightGraphic} />) }
    </div>
  );
};
