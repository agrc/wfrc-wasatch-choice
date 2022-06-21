import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import './MapLens.scss';

export default (props) => {
  return (
    <div
      id="centerContainer"
      data-testid="center-container"
      className={'map-lens map-lens--with-border' + (props.sideBarOpen ? ' map-lens--side-bar-open' : '')}
    >
      <Button size="sm" color="info" className="map-lens__sidebar btn btn-default btn-xs" onClick={props.toggleSidebar}>
        {props.sideBarOpen ? (
          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} size="xs" flip="horizontal" />
        )}
      </Button>
      {props.children}
    </div>
  );
};
