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
      </Nav>
    </div>
  );
}
