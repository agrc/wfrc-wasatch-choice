import React from 'react';
import TabPicker from './TabPicker';

export default { title: 'TabPicker' };

const MAP_INFOS = {
  one: { name: 'First One' },
  two: { name: 'Second One' },
  three: { name: 'Third One' },
  four: { name: 'Fourth One' },
  five: { name: 'Fifth One' },
  six: { name: 'Sixth One' },
  seven: { name: 'Seventh One' },
  eight: { name: 'Eighth One' },
};
const TestFixture = ({ initialSelectedIds, maxReached }) => {
  const [selectedIds, setSelectedIds] = React.useState(initialSelectedIds);

  return (
    <>
      <TabPicker
        mapInfos={MAP_INFOS}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        maxReached={maxReached}
      />
      Selected Ids:
      <ol>
        {selectedIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ol>
    </>
  );
};

TestFixture.propTypes = {
  initialSelectedIds: TabPicker.propTypes.selectedIds,
  maxReached: TabPicker.propTypes.maxReached,
};

export const NoneSelected = () => <TestFixture initialSelectedIds={[]} />;

export const Selected = () => <TestFixture initialSelectedIds={['two', 'one', 'five']} />;

export const MaxReached = () => (
  <TestFixture initialSelectedIds={['two', 'one', 'five', 'six', 'seven']} maxReached={true} />
);
MaxReached.parameters = {
  storyshots: { disable: true },
};
