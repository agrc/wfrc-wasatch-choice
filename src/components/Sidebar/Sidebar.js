import React from 'react';
import './Sidebar.scss';
import { Button } from 'reactstrap';
import { useWindowWidth } from '../../hooks';
import config from '../../config';


export default props => {
  const windowWidth = useWindowWidth();

  return (
    <div id="sideBar" className="side-bar side-bar--with-border side-bar--open">
      <div className="side-bar__padder">
        { windowWidth <= config.MAX_SMALL_SCREEN_WIDTH &&
          <div>
            <Button close onClick={props.toggleSidebar} />
          </div>
        }
        {props.children}
      </div>
    </div>
  )
};
