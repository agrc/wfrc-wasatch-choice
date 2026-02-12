import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';
import './MapLens.scss';

export default function MapLens({ sideBarOpen, toggleSidebar, children }) {
  const { t } = useTranslation();
  return (
    <div
      id="centerContainer"
      data-testid="center-container"
      className={
        'map-lens map-lens--with-border' +
        (sideBarOpen ? ' map-lens--side-bar-open' : '')
      }
    >
      <Button
        size="sm"
        color="info"
        className="map-lens__sidebar btn btn-default btn-xs"
        onClick={toggleSidebar}
        aria-label={sideBarOpen ? t('sidebar.close') : t('sidebar.open')}
      >
        {sideBarOpen ? (
          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} size="xs" flip="horizontal" />
        )}
      </Button>
      {children}
    </div>
  );
}

MapLens.propTypes = {
  sideBarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
