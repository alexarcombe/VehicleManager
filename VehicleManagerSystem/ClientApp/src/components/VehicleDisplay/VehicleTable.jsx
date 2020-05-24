import React from 'react';
import VirtualizedTable from '../VirtualizedTable/VirtualizedTable';

function VehicleTable(props) {
  const { vehicles, setCurrent } = props;
  return (
    <VirtualizedTable
      rowCount={vehicles.length}
      rowGetter={({ index }) => {
        const { tags, ...rest } = vehicles[index];
        return { ...rest, tags: tags.join(', ') };
      }}
      onRowClick={({ rowData }) => {
        setCurrent(rowData);
      }}
      columns={[
        {
          width: 300,
          label: 'Name',
          dataKey: 'name',
        },
        {
          width: 300,
          label: 'Model',
          dataKey: 'model',
        },
        {
          width: 300,
          label: 'Tags',
          dataKey: 'tags',
        },
      ]}
    />
  );
}

export default VehicleTable;
