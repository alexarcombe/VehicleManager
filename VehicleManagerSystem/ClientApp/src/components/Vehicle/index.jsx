import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, colors } from '@material-ui/core/';
import { Add } from '@material-ui/icons';
import Actions from './Actions';
import SensorList from './SensorList';
import CommentList from './CommentList';
import Dialog from '../Layout/Dialog';
import CommentForm from './CommentForm';
import SensorForm from './SensorForm';
import { AuthContext } from '../../context/authContext';
import { CHANGE } from '../../actions/types';

const onChange = (e, dispatch) => {
  const { id, value } = e.target;
  dispatch({ type: CHANGE, payload: { id, value } });
};

export default function Vehicle(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const [sensorFormOpen, setSensorFormOpen] = useState(false);
  const { state, dispatch, remove, submit } = props;

  const onConfirm = (name, values) => {
    const newList = [...state.values[name], values];
    dispatch({ type: CHANGE, payload: { id: name, value: newList } });
  };

  const { values, mode, errors } = state;
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <Actions
          state={state}
          dispatch={dispatch}
          remove={remove}
          submit={submit}
        />
        <TextField
          className={classes.textField}
          id="name"
          label="Name*"
          value={values.name}
          onChange={(e) => onChange(e, dispatch)}
          error={errors.name !== undefined}
          helperText={errors.name && errors.name}
          disabled={mode === 'Selected' || auth === ''}
          fullWidth
        />
        <TextField
          className={classes.textField}
          id="model"
          label="Model"
          value={values.model}
          onChange={(e) => onChange(e, dispatch)}
          disabled={mode === 'Selected' || auth === ''}
          fullWidth
        />
        <TextField
          className={classes.textField}
          id="tags"
          label="Tags"
          value={values.tags}
          onChange={(e) => onChange(e, dispatch)}
          helperText="Seperated by comma ( , )"
          disabled={mode === 'Selected' || auth === ''}
          fullWidth
        />
        <Grid className={classes.fieldGrid} container spacing={1}>
          <Grid item xs={4}>
            <TextField
              id="speed"
              label="Speed"
              value={values.speed}
              onChange={(e) => onChange(e, dispatch)}
              disabled={mode === 'Selected' || auth === ''}
              error={errors.speed !== undefined}
              helperText={errors.speed && errors.speed}
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="latitude"
              label="Latitude"
              value={values.latitude}
              onChange={(e) => onChange(e, dispatch)}
              error={errors.latitude !== undefined}
              helperText={errors.latitude && errors.latitude}
              disabled={mode === 'Selected' || auth === ''}
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="longitude"
              label="Longitude"
              value={values.longitude}
              onChange={(e) => onChange(e, dispatch)}
              error={errors.longitude !== undefined}
              helperText={errors.longitude && errors.longitude}
              disabled={mode === 'Selected' || auth === ''}
              type="number"
            />
          </Grid>
        </Grid>
        <Grid className={classes.listGrid} container spacing={1}>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <span>
              Sensors{' '}
              <Add
                className={auth !== '' ? classes.add : ''}
                fontSize="small"
                onClick={() => setSensorFormOpen(auth !== '' && true)}
              />
            </span>
            <SensorList sensors={values.sensors} />
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <span>
              Comments{' '}
              <Add
                className={auth !== '' ? classes.add : ''}
                fontSize="small"
                onClick={() => setCommentFormOpen(auth !== '' && true)}
              />
            </span>
            <CommentList comments={values.comments} />
          </Grid>
        </Grid>
      </form>
      <Dialog
        open={commentFormOpen}
        handleClose={() => setCommentFormOpen(false)}
      >
        <CommentForm
          handleClose={() => setCommentFormOpen(false)}
          onConfirm={onConfirm}
        />
      </Dialog>
      <Dialog
        open={sensorFormOpen}
        handleClose={() => setSensorFormOpen(false)}
      >
        <SensorForm
          handleClose={() => setSensorFormOpen(false)}
          onConfirm={onConfirm}
        />
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    minHeight: '450px',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '100%',
    height: '100%',
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(1),
    width: '80%',
  },
  fieldGrid: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
  listGrid: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    height: '25%',
  },
  add: {
    color: colors.green[800],
  },
}));
