import React, { useContext } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './Tabs.scss';
import TabsContext from './TabsContext';
import config from '../../config';


export default props => {
  const { currentTabIndex, setCurrentTab } = useContext(TabsContext);
  const onClick = index => setCurrentTab(index);

  return (
    <div className="tabs">
      <Nav tabs>
        { config.tabs.map(({name}, index) => {
          index = index + '';

          return (
            <NavItem key={index}>
              <NavLink className={(currentTabIndex + '' === index) ? 'active' : null} onClick={onClick.bind(this, index)}>
                {name}
              </NavLink>
            </NavItem>
          );
        }) }
        { window.innerWidth < config.MIN_DESKTOP_WIDTH &&
          <NavItem key={'99'}>
            <a className="landing-page-link" href={config.links.landingPage}>Wasatch Choice</a>
          </NavItem>
        }
      </Nav>
    </div>
  );
}
