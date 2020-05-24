import React from 'react';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import Dialog from '../Layout/Dialog';

export default function DeleteDialog(props) {
  const {
    setDialogOpen,
    dialogOpen,
    values: { name, model, tags },
    onConfirm,
  } = props;
  return (
    <Dialog open={dialogOpen} handleClose={() => setDialogOpen(false)}>
      <DialogTitle>Do you want to delete this Vehicle?</DialogTitle>
      <DialogContent>
        <DialogContentText>Name: {name}</DialogContentText>
        <DialogContentText>
          Model: {model === '' ? 'N/A' : model}
        </DialogContentText>
        <DialogContentText>
          Tags: {tags === '' ? 'N/A' : tags}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
