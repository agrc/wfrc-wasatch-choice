import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';
import './MapWidget.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default props => {
  const [isOpen, setIsOpen] = useState(props.defaultOpen);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const padding = '7px';
  const cardStyle = {
    display: isOpen ? 'flex' : 'none',
    top: props.position === 0 ? padding : `calc(50% - ${padding})`,
    bottom: props.position === 0 ? `calc(50% + 2 * ${padding})` : padding
  };
  const buttonDiv = useRef();
  useEffect(() => {
    if (props.mapView && buttonDiv.current) {
      props.mapView.ui.add(buttonDiv.current, 'top-left');
    }

    const buttonDivRef = buttonDiv.current;

    return () => {
      props.mapView && props.mapView.ui.remove(buttonDivRef);
    }
  }, [buttonDiv, props.mapView]);

  return (
    <div>
      <div className="map-widget-button esri-widget--button" ref={buttonDiv}
        onClick={toggle} title={props.name}>
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <Card style={cardStyle} className="map-widget-card">
        <CardHeader>
          {props.name}
          <div className="buttons-container">
            { props.showReset &&
              <Button
                className="reset-button"
                color="link"
                onClick={props.onReset}>
                <small>reset</small>
              </Button>
            }
            <Button close onClick={toggle} />
          </div>
        </CardHeader>
        <CardBody>
          {props.children}
        </CardBody>
      </Card>
    </div>
  );
};
