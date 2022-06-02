import React from 'react';
import DualListBox from 'react-dual-listbox';
import '../../../node_modules/react-dual-listbox/src/scss/react-dual-listbox.scss';
import { Alert } from 'reactstrap';
import config from '../../config';
import { useSpecialTranslation } from '../../i18n';


export const getOptions = (mapInfos, t) => {
  const categories = {};
  const options = [];

  Object.keys(mapInfos).forEach(id => {
    const info = mapInfos[id];
    const label = t(info.name);
    const value = { value: id, label };
    const category = info.category && t(info.category);

    if (category) {
      if (categories[category]) {
        categories[category].push(value);
      } else {
        categories[category] = [value];
      }
    } else {
      options.push(value);
    }
  });

  if (Object.keys(categories).length > 0) {
    Object.entries(categories).forEach(([label, values]) => {
      options.push({ label, options: values });
    });
  }

  return options;
};


const TabPicker = ({ mapInfos, selectedIds, setSelectedIds, maxReached }) => {
  const t = useSpecialTranslation();
  const options = React.useMemo(() => getOptions(mapInfos, t), [mapInfos, t]);

  return (
    <>
      <DualListBox
        // add a static id so that a random one doesn't break snapshot tests
        id="tab-picker"
        lang={{
          availableHeader: t('trans:mapTabsDialog.availableHeader'),
          selectedHeader: `${t('trans:mapTabsDialog.selectedHeader')} (max=${config.maxTabsAllowed})`
        }}
        onChange={setSelectedIds}
        options={options}
        preserveSelectOrder={true}
        selected={selectedIds}
        showHeaderLabels={true}
        showOrderButtons={true}
      />
      <br></br>
      { maxReached ? <Alert fade={false} color="warning">{t('trans:mapTabsDialog.maxMessage')}</Alert> : null }
    </>
  );
};

export default TabPicker;
