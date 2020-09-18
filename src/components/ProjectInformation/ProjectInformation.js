import React from 'react';
import Details from './Details';
import './ProjectInformation.scss';
import Loader from 'react-loader-spinner';
import { useSpecialTranslation } from '../../i18n';


export default props => {
  console.log('ProjectInformation');

  const t = useSpecialTranslation();

  return (
    <div className="project-information">
      { props.graphics.length === 0 && !props.showLoader &&
        <p>{t('trans:projectInformationPrompt')}</p> }
      { props.showLoader && <Loader type="Oval" className="loader" /> }
      { props.graphics.map((graphic, index) =>
        <Details key={index} graphic={graphic} highlightGraphic={props.highlightGraphic} />) }
    </div>
  );
};
