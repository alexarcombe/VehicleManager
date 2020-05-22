import React from 'react';
import useFormFields from '../../hooks/useFormFields';
import { CHANGE } from '../../actions/types';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

const init = {
  by: '',
  comment: '',
  date: new Date().toDateString(),
};

function CommentForm(props) {
  const { handleClose, onConfirm } = props;
  const [state, dispatch] = useFormFields(init);
  const { values } = state;

  const onChange = (e) => {
    const { id, value } = e.target;
    dispatch({ type: CHANGE, payload: { id, value } });
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Create a Comment!</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="by"
          label="By"
          value={values.by}
          onChange={onChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="comment"
          label="Comment"
          multiline
          rows={3}
          value={values.comment}
          onChange={onChange}
          fullWidth
        />
        <DialogContentText>Date: {values.date}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm('comments', state.values);
            handleClose();
          }}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </>
  );
}

export default CommentForm;
