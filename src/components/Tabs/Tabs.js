import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './Tabs.scss';
import { useCurrentTabConfig } from './TabsContext';
import config, { getDefaultCurrentTabIds } from '../../config';


const LOCAL_STORAGE_ITEM_NAME = 'currentTabIds';

export default props => {
  const [ currentTabConfig, setCurrentTabConfig ] = useCurrentTabConfig();
  const initialTabIds = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || getDefaultCurrentTabIds();
  const [ currentTabIds, setCurrentTabIds ] = React.useState(initialTabIds);
  const onClick = id => setCurrentTabConfig({id, ...config.tabInfos[id]});

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, currentTabIds);
  }, [currentTabIds]);

  return (
    <div className="tabs">
      <Nav tabs>
        { currentTabIds.map(id => {
          const tabInfo = config.tabInfos[id];

          return (
            <NavItem key={id}>
              <NavLink className={(currentTabConfig.id === id) ? 'active' : null} onClick={onClick.bind(null, id)} aria-label={`${tabInfo.name} Tab`}>
                {tabInfo.name}
              </NavLink>
            </NavItem>
          );
        }) }
      </Nav>
    </div>
  );
}
