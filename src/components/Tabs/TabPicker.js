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
          availableHeader: t('trans:mapTabsDialog.availableHeader'),
          selectedHeader: `${t('trans:mapTabsDialog.selectedHeader')} (max=${config.MAX_TABS_ALLOWED})`
        }}
        onChange={setSelectedIds}
        options={options}
        preserveSelectOrder={true}
        selected={selectedIds}
        showHeaderLabels={true}
        showOrderButtons={true}
      />
      <br></br>
      { maxReached && <Alert color="warning">{t('trans:mapTabsDialog.maxMessage')}</Alert> }
    </>
  );
};

export default TabPicker;
