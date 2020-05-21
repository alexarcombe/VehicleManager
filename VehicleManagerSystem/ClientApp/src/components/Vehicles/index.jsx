import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import VehicleTable from '../VehicleTable';
import Vehicle from '../Vehicle';
import useFilterSearch from '../../hooks/useFilterSearch';
import useFormFields from '../../hooks/useFormFields';
import validate from './validate';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

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

const initialValuesFilter = {
  searchPhrase: '',
  filter: 'name',
  list: [],
  filteredList: [],
};

const initialValues = {
  name: '',
  model: '',
  tags: '',
  speed: '0',
  latitude: '-36.8077324',
  longitude: '174.7837708',
  sensors: [],
  comments: [],
};

function Vehicles() {
  const classes = useStyles();
  const [formMode, setFormMode] = useState('Create');
  const auth = useContext(AuthContext);
  const [listValues, onChange, setList, update, add, remove] = useFilterSearch(
    initialValuesFilter
  );
  const [
    values,
    errors,
    handleChange,
    handleSubmit,
    setFormFields,
  ] = useFormFields({
    initialValues,
    onSubmit: async (values) => {
      let result;
      let { id, tags, ...rest } = values;
      tags = tags.split(',').map((tag) => tag.trimLeft());
      if (id === undefined) {
        result = await axios.post('api/vehicles', {
          customerId: auth,
          tags,
          ...rest,
        });
        console.log(result.data);
        add(result.data);
      } else {
        result = await axios.put(`api/vehicles/${id}`, {
          id,
          tags,
          ...rest,
        });
        console.log(result.data);
        update(result.data);
      }
      setFormMode('Create');
    },
    validate,
  });

  const onDelete = async (id) => {
    axios.delete(`api/vehicles/${id}`);
    remove(id);
  };

  return (
    <Container className={classes.root}>
      <Typography component="h1" variant="h3">
        Vehicles
      </Typography>
      <Grid className={classes.grid} container spacing={0}>
        <Grid item xs={12} sm={6}>
          <VehicleTable
            values={listValues}
            onChange={onChange}
            setList={setList}
            setCurrent={(current) => {
              setFormFields(current);
              setFormMode('Selected');
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Vehicle
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setFormFields={setFormFields}
            formMode={formMode}
            setFormMode={setFormMode}
            remove={onDelete}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Vehicles;
