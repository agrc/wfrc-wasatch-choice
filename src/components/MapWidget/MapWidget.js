import React, { useState, useRef, useEffect, createContext } from 'react';
import { Button, Card, CardHeader } from 'reactstrap';
import './MapWidget.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { useSpecialTranslation } from '../../i18n';


export const MapWidgetContext = createContext();


export default props => {
  const [isOpen, setIsOpen] = useState(props.defaultOpen);
  const scrollBar = useRef();
  const scrollBarContainer = useRef();
  const t = useSpecialTranslation();

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

  const updateScrollbar = () => scrollBar.current.update();

  React.useEffect(() => {
    if (scrollBarContainer.current) {
      scrollBar.current = new PerfectScrollbar(scrollBarContainer.current, { suppressScrollX: true });
    }

    return () => {
      if (scrollBar.current) {
        scrollBar.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <MapWidgetContext.Provider value={{ updateScrollbar }}>
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
                  <small>{t('trans:reset')}</small>
                </Button>
              }
              <Button close onClick={toggle} />
            </div>
          </CardHeader>
          <div ref={scrollBarContainer} className="card-body">
            {props.children}
          </div>
        </Card>
      </MapWidgetContext.Provider>
    </div>
  );
};
