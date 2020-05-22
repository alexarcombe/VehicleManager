import React from 'react';
import Dialog from '@material-ui/core/Dialog';

const CustomDialog = (props) => {
  const { handleClose, open } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {props.children}
    </Dialog>
  );
};

export default CustomDialog;
