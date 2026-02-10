import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import PropTypes from 'prop-types';
import React from 'react';
import { isMobile } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
} from 'reactstrap';
import config, { useCurrentTabConfig } from '../../config';
import { useSpecialTranslation } from '../../i18n';
import { ACTION_TYPES, URLParamsContext } from '../../URLParams';
import TabPicker from './TabPicker';
import './Tabs.scss';

export default function Tabs({ innerRef }) {
  const currentTabConfig = useCurrentTabConfig();
  const [{ mapList }, dispatchURLParams] = React.useContext(URLParamsContext);
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

  const SortableNavItem = ({ value }) => {
    const onClick = (id) => {
      dispatchURLParams({
        type: ACTION_TYPES.CURRENT_TAB_ID,
        payload: id,
      });
    };
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: value.id,
        disabled: isMobile,
      });
    const style = {
      // don't transform y axis or scale the element
      transform: transform?.x ? `translate3d(${transform.x}px, 0, 0)` : '',
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        aria-label={`${t(value.name)} Tab`}
      >
        <NavItem>
          <NavLink
            className={currentTabConfig.id === value.id ? 'active' : null}
            onClick={() => onClick(value.id)}
          >
            {t(value.name)}
          </NavLink>
        </NavItem>
      </div>
    );
  };

  SortableNavItem.propTypes = {
    value: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  const containerRef = React.useRef();

  const SortableNav = ({ items, onSortEnd }) => {
    const perfectOptions = {
      suppressScrollY: true,
    };

    const sensors = useSensors(
      useSensor(window.E2E_TESTING ? MouseSensor : PointerSensor, {
        activationConstraint: {
          distance: 5,
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    );

    return (
      // use generic div node over reactstrap Nav so that we can get a ref
      <PerfectScrollbar options={perfectOptions}>
        <div className="nav nav-tabs" ref={containerRef}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onSortEnd}
          >
            <SortableContext
              items={items}
              strategy={horizontalListSortingStrategy}
            >
              {items.map((id) => {
                const tabInfo = config.mapInfos[id];

                return (
                  <SortableNavItem
                    key={`item-${id}`}
                    value={{ id, ...tabInfo }}
                    disabled={isMobile}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
          <NavItem key="settings">
            <NavLink
              onClick={toggleModal}
              className="settings"
              data-testid="tab-configuration"
            >
              <i className="fas fa-plus"></i>
            </NavLink>
          </NavItem>
        </div>
      </PerfectScrollbar>
    );
  };

  SortableNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.PropTypes.string).isRequired,
    onSortEnd: PropTypes.func.isRequired,
  };

  const onSortEnd = ({ active, over }) => {
    if (!active || !over) {
      return;
    }

    const oldIndex = mapList.indexOf(active.id);
    const newIndex = mapList.indexOf(over.id);

    if (oldIndex !== newIndex) {
      setCurrentTabIds(arrayMove(mapList, oldIndex, newIndex));
    }
  };

  return (
    <div className="tabs" ref={innerRef}>
      <SortableNav items={mapList} onSortEnd={onSortEnd} />
      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {t('trans:mapTabsDialog.title')}
        </ModalHeader>
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
}

Tabs.propTypes = {
  innerRef: PropTypes.object.isRequired,
};
