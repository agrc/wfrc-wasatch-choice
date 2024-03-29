import PropTypes from 'prop-types';
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { useSpecialTranslation } from '../../i18n';
import { MapWidgetContext } from '../MapWidget/MapWidget';
import Details from './Details';
import './ProjectInformation.scss';

export default function ProjectInformation({
  graphics,
  highlightGraphic,
  showLoader,
}) {
  console.log('ProjectInformation');

  const { updateScrollbar } = React.useContext(MapWidgetContext);

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (updateScrollbar) {
      console.log('updating scrollbar');
      updateScrollbar();
    }

    // this if statement helps with tests
    if (
      typeof containerRef.current.scrollIntoView === 'function' &&
      graphics.length > 0
    ) {
      console.log('scrolling into view');
      containerRef.current.scrollIntoView();
    }
  }, [graphics, updateScrollbar]);

  const t = useSpecialTranslation();

  return (
    <div className="project-information" ref={containerRef}>
      {graphics.length === 0 && !showLoader && (
        <p>{t('trans:projectInformationPrompt')}</p>
      )}
      {showLoader && (
        <div className="loader">
          <Oval />
        </div>
      )}
      {graphics.map((graphic, index) => (
        <Details
          key={index}
          graphic={graphic}
          highlightGraphic={highlightGraphic}
        />
      ))}
    </div>
  );
}

ProjectInformation.propTypes = {
  graphics: PropTypes.array,
  highlightGraphic: PropTypes.func,
  showLoader: PropTypes.bool,
};
