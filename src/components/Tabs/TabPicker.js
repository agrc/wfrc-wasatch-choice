import React from 'react';
import DualListBox from 'react-dual-listbox';
import '../../../node_modules/react-dual-listbox/src/scss/react-dual-listbox.scss';


const TabPicker = ({ tabInfos, selectedIds, setSelectedIds }) => {

  const options = Object.keys(tabInfos).map(id => {
    return { value: id, label: tabInfos[id].name };
  });

  return (
    <>
      <DualListBox
        options={options}
        selected={selectedIds}
        onChange={setSelectedIds}
        preserveSelectOrder={true}
        showOrderButtons={true}
        // add a static id so that a random one doesn't break snapshot tests
        id='tab-picker'
      />
    </>
  );
};

export default TabPicker;
