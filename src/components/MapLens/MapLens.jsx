import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import './MapLens.scss';
import PropTypes from 'prop-types';

export default function MapLens({ sideBarOpen, toggleSidebar, children }) {
  return (
    <div
      id="centerContainer"
      data-testid="center-container"
      className={'map-lens map-lens--with-border' + (sideBarOpen ? ' map-lens--side-bar-open' : '')}
    >
      <Button size="sm" color="info" className="map-lens__sidebar btn btn-default btn-xs" onClick={toggleSidebar}>
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
