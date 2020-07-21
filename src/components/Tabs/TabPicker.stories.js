import React from 'react';
import TabPicker from './TabPicker';


export default { title: 'TabPicker' };

const TAB_INFOS = {
  'one': { name: 'First One' },
  'two': { name: 'Second One' },
  'three': { name: 'Third One' },
  'four': { name: 'Fourth One' },
  'five': { name: 'Fifth One' },
  'six': { name: 'Sixth One' },
  'seven': { name: 'Seventh One' },
  'eight': { name: 'Eighth One' },
};
export const NoneSelected = () => {
  const [selectedIds, setSelectedIds] = React.useState([]);

  return (
    <>
      <TabPicker tabInfos={TAB_INFOS} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
      Selected Ids:
      <ol>
        {selectedIds.map(id => <li key={id}>{id}</li>)}
      </ol>
    </>
  );
};

export const Selected = () => {
  const [selectedIds, setSelectedIds] = React.useState(['two', 'one', 'five']);

  return (
    <>
      <TabPicker tabInfos={TAB_INFOS} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
      Selected Ids:
      <ol>
        {selectedIds.map(id => <li key={id}>{id}</li>)}
      </ol>
    </>
  );
};
