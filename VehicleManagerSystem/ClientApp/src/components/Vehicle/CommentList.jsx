import React from 'react';
import VirtualizedTable from '../VirtualizedTable/VirtualizedTable';

export default function SensorList(props) {
  const { comments } = props;

  return (
    <VirtualizedTable
      rowCount={comments.length}
      rowGetter={({ index }) => comments[index]}
      columns={[
        {
          width: 200,
          label: 'By',
          dataKey: 'by',
        },
        {
          width: 200,
          label: 'Date',
          dataKey: 'date',
        },
      ]}
    />
  );
}
