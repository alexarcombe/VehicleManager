import React from 'react';
import useFormFields from '../../hooks/useFormFields';
import { CHANGE } from '../../actions/types';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

const init = {
  name: '',
  value: '',
};

function SensorForm(props) {
  const { handleClose, onConfirm } = props;
  const [state, dispatch] = useFormFields(init);
  const { values } = state;

  const onChange = (e) => {
    const { id, value } = e.target;
    dispatch({ type: CHANGE, payload: { id, value } });
  };

  return (
    <>
      <DialogTitle>Add a Sensor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          value={values.name}
          onChange={onChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="value"
          label="Value"
          value={values.value}
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm('sensors', state.values);
            handleClose();
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </>
  );
}

export default SensorForm;
