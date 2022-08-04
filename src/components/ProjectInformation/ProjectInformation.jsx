import React from 'react';
import { Oval } from 'react-loader-spinner';
import { useSpecialTranslation } from '../../i18n';
import { MapWidgetContext } from '../MapWidget/MapWidget';
import Details from './Details';
import './ProjectInformation.scss';

export default (props) => {
  console.log('ProjectInformation');

  const { updateScrollbar } = React.useContext(MapWidgetContext);

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (updateScrollbar) {
      console.log('updating scrollbar');
      updateScrollbar();
    }

    // this if statement helps with tests
    if (typeof containerRef.current.scrollIntoView === 'function' && props.graphics.length > 0) {
      console.log('scrolling into view');
      containerRef.current.scrollIntoView();
    }
  }, [props.graphics, updateScrollbar]);

  const t = useSpecialTranslation();

  return (
    <div className="project-information" ref={containerRef}>
      {props.graphics.length === 0 && !props.showLoader && <p>{t('trans:projectInformationPrompt')}</p>}
      {props.showLoader && (
        <div className="loader">
          <Oval />
        </div>
      )}
      {props.graphics.map((graphic, index) => (
        <Details key={index} graphic={graphic} highlightGraphic={props.highlightGraphic} />
      ))}
    </div>
  );
};
