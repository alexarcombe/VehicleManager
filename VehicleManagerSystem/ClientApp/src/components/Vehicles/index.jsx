import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import VehicleTable from '../VehicleTable';
import Vehicle from '../Vehicle';
import useFilterSearch from '../../hooks/useFilterSearch';
import useFormFields from '../../hooks/useFormFields';
import submit from './submit';
import { initialFilterValues, initialFormValues } from '../../init';
import { AuthContext } from '../../context/authContext';
import { removeVehicle } from '../../api/vehicleAPI';
import { REMOVE, SET_FIELDS } from '../../actions/types';

function Vehicles() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [searchState, searchDispatch] = useFilterSearch(initialFilterValues);
  const [formState, formDispatch] = useFormFields(initialFormValues);

  const onDelete = async (id) => {
    removeVehicle(id);
    searchDispatch({ type: REMOVE, payload: id });
    formDispatch({
      type: SET_FIELDS,
      payload: { values: initialFormValues, mode: 'create' },
    });
  };

  const onSubmit = () => {
    submit(auth, formState.values, searchDispatch, formDispatch);
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
      <Grid className={classes.grid} container spacing={0}>
        <Grid item xs={12} sm={6}>
          <VehicleTable
            state={searchState}
            dispatch={searchDispatch}
            setCurrent={setCurrent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Vehicle
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

export default Vehicles;
