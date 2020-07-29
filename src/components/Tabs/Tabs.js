import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink } from 'reactstrap';
import './Tabs.scss';
import config, { useCurrentTabConfig } from '../../config';
import TabPicker from './TabPicker';
import { URLParamsContext, ACTION_TYPES } from '../../URLParams';


export default props => {
  const currentTabConfig = useCurrentTabConfig();
  const [ { mapList }, dispatchURLParams ] = React.useContext(URLParamsContext);
  const onClick = id => dispatchURLParams({
    type: ACTION_TYPES.CURRENT_TAB_ID,
    payload: id
  });
  const [ modalIsOpen, setModalIsOpen ] = React.useState(false);
  const [ maxReached, setMaxReached ] = React.useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const setCurrentTabIds = ids => {
    if (ids.length > config.MAX_TABS_ALLOWED) {
      setMaxReached(true);
    } else {
      setMaxReached(false);

      dispatchURLParams({
        type: ACTION_TYPES.AVAILABLE_TAB_IDS,
        payload: ids
      });
    }
  };

  return (
    <div className="tabs">
      <Nav tabs>
        { mapList.map(id => {
          const tabInfo = config.tabInfos[id];

          return (
            <NavItem key={id}>
              <NavLink
                className={(currentTabConfig.id === id) ? "active" : null}
                onClick={onClick.bind(null, id)} aria-label={`${tabInfo.name} Tab`}
              >
                {tabInfo.name}
              </NavLink>
            </NavItem>
          );
        }) }
        <NavItem key="settings">
          <NavLink onClick={toggleModal} className="settings" data-testid="tab-configuration">
            <i className="fas fa-cog"></i>
          </NavLink>
        </NavItem>
      </Nav>
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Configure Map Tabs</ModalHeader>
        <ModalBody>
          <TabPicker
            tabInfos={config.tabInfos}
            selectedIds={mapList}
            setSelectedIds={setCurrentTabIds}
            maxReached={maxReached}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Finish</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
