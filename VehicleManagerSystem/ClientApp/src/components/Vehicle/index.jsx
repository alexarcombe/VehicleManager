import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Actions from './Actions';
import SensorList from './SensorList';
import CommentList from './CommentList';
import { AuthContext } from '../../context/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
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
}));

export default function Vehicle(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFormFields,
    formMode,
    setFormMode,
    remove,
  } = props;

  const onChange = (e) => {
    if (formMode !== 'Changed') {
      setFormMode('Changed');
    }
    handleChange(e);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <Actions
          reset={setFormFields}
          id={values.id}
          formMode={formMode}
          setFormMode={setFormMode}
          onSubmit={handleSubmit}
          remove={remove}
        />
        <TextField
          className={classes.textField}
          id="name"
          label="Name*"
          value={values.name}
          onChange={onChange}
          error={errors.name !== undefined}
          helperText={errors.name && errors.name}
          disabled={formMode === 'Selected' || auth === ''}
          fullWidth
        />
        <TextField
          className={classes.textField}
          id="model"
          label="Model"
          value={values.model}
          onChange={onChange}
          disabled={formMode === 'Selected' || auth === ''}
          fullWidth
        />
        <TextField
          className={classes.textField}
          id="tags"
          label="Tags"
          value={values.tags}
          onChange={onChange}
          helperText="Seperated by comma ( , )"
          disabled={formMode === 'Selected' || auth === ''}
          fullWidth
        />
        <Grid className={classes.fieldGrid} container spacing={1}>
          <Grid item xs={4}>
            <TextField
              id="speed"
              label="Speed"
              value={values.speed}
              onChange={onChange}
              disabled={formMode === 'Selected' || auth === ''}
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
              onChange={onChange}
              error={errors.latitude !== undefined}
              helperText={errors.latitude && errors.latitude}
              disabled={formMode === 'Selected' || auth === ''}
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="longitude"
              label="Longitude"
              value={values.longitude}
              onChange={onChange}
              error={errors.longitude !== undefined}
              helperText={errors.longitude && errors.longitude}
              disabled={formMode === 'Selected' || auth === ''}
              type="number"
            />
          </Grid>
        </Grid>
        <Grid className={classes.listGrid} container spacing={1}>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            Sensors
            <SensorList sensors={values.sensors} />
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            Comments
            <CommentList comments={values.comments} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
