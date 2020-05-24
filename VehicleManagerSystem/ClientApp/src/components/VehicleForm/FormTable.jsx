import React, { useState } from 'react';
import VirtualizedTable from '../VirtualizedTable/VirtualizedTable';
import Dialog from '../Layout/Dialog';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const shouldDisplay = (display) => {
  return Object.keys(display).length > 0;
};

export default function FormTable(props) {
  const { title, values, withDialog } = props;
  const [display, setDisplay] = useState({});
  if (values.length === 0) {
    return null;
  }
  const keys = Object.keys(values[0]);
  console.log(keys);
  return (
    <>
      <VirtualizedTable
        rowCount={values.length}
        rowGetter={({ index }) => values[index]}
        onRowClick={({ rowData }) => {
          if (withDialog) {
            setDisplay(rowData);
          }
        }}
        columns={[
          {
            width: 200,
            label: capitalize(keys[0]),
            dataKey: keys[0],
          },
          {
            width: 200,
            label: capitalize(keys[keys.length - 1]),
            dataKey: keys[keys.length - 1],
          },
        ]}
      />

      {withDialog && (
        <Dialog
          open={shouldDisplay(display)}
          handleClose={() => setDisplay({})}
        >
          {content(title, display, setDisplay)}
        </Dialog>
      )}
    </>
  );
}

const content = (title, display, setDisplay) => {
  if (!shouldDisplay(display)) {
    return false;
  } else {
    const content = Object.keys(display).map((key) => (
      <DialogContentText key={key}>
        {capitalize(key)}: {display[key]}
      </DialogContentText>
    ));
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDisplay({})} color="primary">
            Done
          </Button>
        </DialogActions>
      </>
    );
  }
};
