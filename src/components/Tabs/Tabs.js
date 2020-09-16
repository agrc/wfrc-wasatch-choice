import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, NavLink } from 'reactstrap';
import './Tabs.scss';
import config, { useCurrentTabConfig } from '../../config';
import TabPicker from './TabPicker';
import { URLParamsContext, ACTION_TYPES } from '../../URLParams';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { useSpecialTranslation } from '../../i18n';


export default props => {
  const currentTabConfig = useCurrentTabConfig();
  const [ { mapList }, dispatchURLParams ] = React.useContext(URLParamsContext);
  const onClick = id => dispatchURLParams({
    type: ACTION_TYPES.CURRENT_TAB_ID,
    payload: id
  });
  const [ modalIsOpen, setModalIsOpen ] = React.useState(false);
  const [ maxReached, setMaxReached ] = React.useState(false);
  const t = useSpecialTranslation();

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

  const SortableNavItem = SortableElement(({ value }) => {
    return (
      <NavItem>
        <NavLink
          className={(currentTabConfig.id === value.id) ? "active" : null}
          onClick={onClick.bind(null, value.id)} aria-label={`${t(value.name)} Tab`}
        >
          {t(value.name)}
        </NavLink>
      </NavItem>
    );
  });

  const containerRef = React.useRef();

  const SortableNav = SortableContainer(({ items }) => {
    return (
      // use generic div node over reactstrap Nav so that we can get a ref
      <div className="nav nav-tabs" ref={containerRef}>
        { items.map((id, index) => {
          const tabInfo = config.mapInfos[id];

          return (
            <SortableNavItem key={`item-${id}`} index={index} value={{ id, ...tabInfo}}/>
          );
        }) }
        <NavItem key="settings">
          <NavLink onClick={toggleModal} className="settings" data-testid="tab-configuration">
            <i className="fas fa-cog"></i>
          </NavLink>
        </NavItem>
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setCurrentTabIds(arrayMove(mapList, oldIndex, newIndex));
  };

  return (
    <div className="tabs">
      <SortableNav
        items={mapList}
        onSortEnd={onSortEnd}
        distance={5}
        helperContainer={() => containerRef.current}
        axis="x"
      />
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{t('trans:mapTabsDialog.title')}</ModalHeader>
        <ModalBody>
          <TabPicker
            mapInfos={config.mapInfos}
            selectedIds={mapList}
            setSelectedIds={setCurrentTabIds}
            maxReached={maxReached}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>{t('trans:mapTabsDialog.finishButton')}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
