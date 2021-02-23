import React from 'react';
import Details from './Details';
import './ProjectInformation.scss';
import Loader from 'react-loader-spinner';
import { useSpecialTranslation } from '../../i18n';
import { MapWidgetContext } from '../MapWidget/MapWidget';


export default props => {
  console.log('ProjectInformation');

  const { updateScrollbar } = React.useContext(MapWidgetContext);

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (updateScrollbar) {
      updateScrollbar();
    }

    // this if statement helps with tests
    if (typeof containerRef.current.scrollIntoView === 'function') {
      containerRef.current.scrollIntoView();
    }
  }, [props.graphics, updateScrollbar]);

  const t = useSpecialTranslation();

  return (
    <div className="project-information" ref={containerRef}>
      { props.graphics.length === 0 && !props.showLoader &&
        <p>{t('trans:projectInformationPrompt')}</p> }
      { props.showLoader && <Loader type="Oval" className="loader" /> }
      { props.graphics.map((graphic, index) =>
        <Details key={index} graphic={graphic} highlightGraphic={props.highlightGraphic} />) }
    </div>
  );
};
