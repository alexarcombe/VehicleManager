import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import { Add, Edit, Delete, Save } from '@material-ui/icons';
import DeleteDialog from './DeleteDialog';
import ActionButton from './ActionButton';
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
      <ActionButton
        name="Add"
        className={`${classes.icons} ${classes.add}`}
        disabled={auth === ''}
        onClick={reset}
        children={<Add />}
      />
      <ActionButton
        name="Edit"
        className={`${classes.icons} ${classes.edit}`}
        disabled={id === undefined}
        onClick={() => dispatch({ type: SET_MODE, payload: 'Edit' })}
        children={<Edit />}
      />
      <ActionButton
        name="Save"
        className={`${classes.icons} ${classes.save}`}
        disabled={mode !== 'Changed'}
        onClick={submit}
        children={<Save />}
      />
      <ActionButton
        name="Delete"
        className={`${classes.icons} ${classes.remove}`}
        disabled={id === undefined}
        onClick={() => setDialogOpen(true)}
        children={<Delete />}
      />
      <DeleteDialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        values={values}
        onConfirm={() => {
          remove(id);
          reset();
          setDialogOpen(false);
        }}
      />
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
  add: {
    color: 'white',
    backgroundColor: colors.indigo[500],
    '&:hover': {
      backgroundColor: colors.indigo[700],
    },
  },
  remove: {
    color: 'white',
    backgroundColor: colors.red[500],
    '&:hover': {
      backgroundColor: colors.red[700],
    },
  },
  edit: {
    color: 'white',
    backgroundColor: colors.blue[200],
    '&:hover': {
      backgroundColor: colors.blue[400],
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
