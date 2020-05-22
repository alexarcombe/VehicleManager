import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Fab,
  colors,
} from '@material-ui/core';
import { Add, Edit, Delete, Save } from '@material-ui/icons';
import Dialog from '../Layout/Dialog';
import { AuthContext } from '../../context/authContext';
import { initialFormValues } from '../../init';
import { SET_MODE, SET_FIELDS } from '../../actions/types';

function Actions(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { state, dispatch, submit, remove } = props;
  const { values, mode } = state;
  const [dialogOpen, setDialogOpen] = useState(false);

  const reset = () => {
    dispatch({
      type: SET_FIELDS,
      payload: { values: initialFormValues, mode: 'Create' },
    });
  };

  const { id } = values;
  return (
    <div className={classes.container}>
      <Fab
        className={classes.icons}
        color="primary"
        aria-label="add"
        onClick={reset}
        disabled={auth === ''}
      >
        <Add />
      </Fab>
      <Fab
        className={classes.icons}
        color="secondary"
        aria-label="edit"
        disabled={id === undefined}
        onClick={() => dispatch({ type: SET_MODE, payload: 'Edit' })}
      >
        <Edit />
      </Fab>
      <Fab
        className={`${classes.icons} ${classes.save}`}
        aria-label="save"
        disabled={mode !== 'Changed'}
        onClick={submit}
      >
        <Save />
      </Fab>
      <Fab
        className={`${classes.icons} ${classes.danger}`}
        aria-label="delete"
        disabled={id === undefined}
        onClick={() => setDialogOpen(true)}
      >
        <Delete />
      </Fab>
      <Dialog open={dialogOpen} handleClose={() => setDialogOpen(false)}>
        <DialogTitle>Do you want to delete this Vehicle?</DialogTitle>
        <DialogContent>
          <DialogContentText>Name: {values.name}</DialogContentText>
          <DialogContentText>
            Model: {values.model === '' ? 'N/A' : values.model}
          </DialogContentText>
          <DialogContentText>
            Tags: {values.tags === '' ? 'N/A' : values.tags}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              remove(id);
              reset();
              setDialogOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
  },
  icons: {
    margin: theme.spacing(1),
  },
  danger: {
    color: 'white',
    backgroundColor: colors.red[500],
    '&:hover': {
      backgroundColor: colors.red[700],
    },
  },
  save: {
    color: 'white',
    backgroundColor: colors.green[400],
    '&:hover': {
      backgroundColor: colors.green[600],
    },
  },
}));

export default Actions;
