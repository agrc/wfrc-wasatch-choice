import React, { useState } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Card, CardHeader, CardBody } from 'reactstrap';
import './MapWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default props => {
  const baseTop = 93;
  const buttonHeight = 41;
  const top = baseTop + (props.position * buttonHeight);
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

  return (
    <>
      <ButtonToolbar className='map-widget-button' style={{ top: `${top}px` }}>
        <ButtonGroup>
          <Button onClick={toggle} title={props.name}>
            <FontAwesomeIcon icon={props.icon} />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <Card style={cardStyle} className='map-widget-card'>
        <CardHeader>
          {props.name}
          <Button close onClick={toggle} />
        </CardHeader>
        <CardBody>
          {props.children}
        </CardBody>
      </Card>
    </>
  );
};
