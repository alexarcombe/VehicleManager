import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VehicleTable from './VehicleTable';
import VehicleSearch from './VehicleSearch';
import { AuthContext } from '../../context/authContext';
import { SET_LIST } from '../../actions/types';
import useVehicles from '../../api/useVehicles';

function VehicleDisplay(props) {
  const classes = useStyles();
  const {
    state: { searchPhrase, filter, filteredList },
    dispatch,
    setCurrent,
  } = props;
  const auth = useContext(AuthContext);
  const { data, error } = useVehicles(auth);

  useEffect(() => {
    if (data !== undefined) {
      dispatch({ type: SET_LIST, payload: data });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      console.log('this is the error: ' + error);
    }
  }, [error]);

  return (
    <div className={classes.root}>
      <VehicleSearch
        searchPhrase={searchPhrase}
        filter={filter}
        dispatch={dispatch}
      />
      <div style={{ height: 'calc(100% - 64px)' }}>
        <VehicleTable vehicles={filteredList} setCurrent={setCurrent} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default VehicleDisplay;
