import React from 'react';
import DualListBox from 'react-dual-listbox';
import '../../../node_modules/react-dual-listbox/src/scss/react-dual-listbox.scss';
import { Alert } from 'reactstrap';
import config from '../../config';
import { useSpecialTranslation } from '../../i18n';


const TabPicker = ({ mapInfos, selectedIds, setSelectedIds, maxReached }) => {
  const t = useSpecialTranslation();
  const options = Object.keys(mapInfos).map(id => {
    return { value: id, label: t(mapInfos[id].name) };
  });

  return (
    <>
      <DualListBox
        // add a static id so that a random one doesn't break snapshot tests
        id="tab-picker"
        lang={{
          availableHeader: 'Other Available Maps',
          selectedHeader: `Maps Displayed (max=${config.MAX_TABS_ALLOWED})`
        }}
        onChange={setSelectedIds}
        options={options}
        preserveSelectOrder={true}
        selected={selectedIds}
        showHeaderLabels={true}
        showOrderButtons={true}
      />
      <br></br>
      { maxReached && <Alert color="warning">A maximum of five tabs may be selected.</Alert> }
    </>
  );
};

export default TabPicker;
