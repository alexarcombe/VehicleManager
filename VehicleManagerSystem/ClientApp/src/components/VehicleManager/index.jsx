import React, { useContext } from 'react';
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  colors,
} from '@material-ui/core';
import { AuthContext } from '../../context/authContext';
import VehicleForm from '../VehicleForm';
import VehicleDisplay from '../VehicleDisplay';

// utility
import submit from './submit';
import { removeVehicle } from '../../api/vehicleAPI';

// Hooks
import { initialFilterValues, initialFormValues } from '../../init';
import useFilterSearch from '../../hooks/useFilterSearch';
import useFormFields from '../../hooks/useFormFields';
import { REMOVE, SET_FIELDS } from '../../actions/types';

function VehicleManager() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [searchState, searchDispatch] = useFilterSearch(initialFilterValues);
  const [formState, formDispatch] = useFormFields(initialFormValues);

  const onSubmit = () => {
    submit(auth, formState.values, searchDispatch, formDispatch);
  };

  const onDelete = async (id) => {
    const { error } = removeVehicle(id);
    if (!error) {
      searchDispatch({ type: REMOVE, payload: id });
      formDispatch({
        type: SET_FIELDS,
        payload: { values: initialFormValues, mode: 'create' },
      });
    } else {
      console.log(error);
    }
  };

  const setCurrent = (current) => {
    formDispatch({
      type: SET_FIELDS,
      payload: { values: current, mode: 'Selected' },
    });
  };

  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h3">
        Vehicles
      </Typography>
      <Grid className={classes.grid} container spacing={1}>
        <Grid item xs={12} sm={6}>
          <VehicleDisplay
            state={searchState}
            dispatch={searchDispatch}
            setCurrent={setCurrent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <VehicleForm
            state={formState}
            dispatch={formDispatch}
            submit={onSubmit}
            remove={onDelete}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'calc(100% - 64px)',
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    backgroundColor: colors.grey[200],
  },
  grid: {
    height: 'calc(90% - 56px)',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default VehicleManager;
