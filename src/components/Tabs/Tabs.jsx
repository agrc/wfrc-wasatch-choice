import { arrayMoveImmutable } from 'array-move';
import React from 'react';
import { isMobile } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, NavItem, NavLink } from 'reactstrap';
import config, { useCurrentTabConfig } from '../../config';
import { useSpecialTranslation } from '../../i18n';
import { ACTION_TYPES, URLParamsContext } from '../../URLParams';
import TabPicker from './TabPicker';
import './Tabs.scss';

export default ({ innerRef }) => {
  const currentTabConfig = useCurrentTabConfig();
  const [{ mapList }, dispatchURLParams] = React.useContext(URLParamsContext);
  const onClick = (id) =>
    dispatchURLParams({
      type: ACTION_TYPES.CURRENT_TAB_ID,
      payload: id,
    });
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [maxReached, setMaxReached] = React.useState(false);
  const t = useSpecialTranslation();

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const setCurrentTabIds = (ids) => {
    if (ids.length > config.maxTabsAllowed) {
      setMaxReached(true);
    } else {
      setMaxReached(false);

      dispatchURLParams({
        type: ACTION_TYPES.AVAILABLE_TAB_IDS,
        payload: ids,
      });
    }
  };

  const SortableNavItem = SortableElement(({ value }) => {
    return (
      <NavItem>
        <NavLink
          className={currentTabConfig.id === value.id ? 'active' : null}
          onClick={onClick.bind(null, value.id)}
          aria-label={`${t(value.name)} Tab`}
        >
          {t(value.name)}
        </NavLink>
      </NavItem>
    );
  });

  const containerRef = React.useRef();

  const SortableNav = SortableContainer(({ items }) => {
    const perfectOptions = {
      suppressScrollY: true,
    };

    return (
      // use generic div node over reactstrap Nav so that we can get a ref
      <PerfectScrollbar options={perfectOptions}>
        <div className="nav nav-tabs" ref={containerRef}>
          {items.map((id, index) => {
            const tabInfo = config.mapInfos[id];

            return <SortableNavItem key={`item-${id}`} index={index} value={{ id, ...tabInfo }} disabled={isMobile} />;
          })}
          <NavItem key="settings">
            <NavLink onClick={toggleModal} className="settings" data-testid="tab-configuration">
              <i className="fas fa-cog"></i>
            </NavLink>
          </NavItem>
        </div>
      </PerfectScrollbar>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setCurrentTabIds(arrayMoveImmutable(mapList, oldIndex, newIndex));
  };

  return (
    <div className="tabs" ref={innerRef}>
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
          <Button color="primary" onClick={toggleModal}>
            {t('trans:mapTabsDialog.finishButton')}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
