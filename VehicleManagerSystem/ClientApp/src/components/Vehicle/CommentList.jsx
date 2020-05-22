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

export default function SensorList(props) {
  const { comments } = props;
  const [comment, setComment] = useState({});

  return (
    <>
      <VirtualizedTable
        rowCount={comments.length}
        rowGetter={({ index }) => comments[index]}
        onRowClick={({ rowData }) => {
          setComment(rowData);
        }}
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
      <Dialog open={isComment(comment)} handleClose={() => setComment({})}>
        {content(comment, setComment)}
      </Dialog>
    </>
  );
}

const isComment = (comment) => {
  return Object.keys(comment).length !== 0;
};

const content = (comment, setComment) => {
  if (!isComment(comment)) {
    return false;
  } else {
    return (
      <>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>by: {comment.by}</DialogContentText>
          <DialogContentText>Comment: {comment.comment}</DialogContentText>
          <DialogContentText>Date: {comment.date}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComment({})} color="primary">
            Done
          </Button>
        </DialogActions>
      </>
    );
  }
};
