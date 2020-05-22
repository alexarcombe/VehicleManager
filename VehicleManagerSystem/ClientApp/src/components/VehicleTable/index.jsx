import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VehicleList from './VehicleList';
import SearchBar from './SearchBar';
import { AuthContext } from '../../context/authContext';
import { SET_LIST } from '../../actions/types';
import useVehicles from '../../api/useVehicles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
    backgroundColor: theme.palette.background.paper,
  },
}));

function VehicleTable(props) {
  const classes = useStyles();
  const {
    state: { searchPhrase, filter, filteredList },
    dispatch,
    setCurrent,
  } = props;
  const auth = useContext(AuthContext);
  const { data } = useVehicles(auth);

  useEffect(() => {
    if (data !== undefined) {
      dispatch({ type: SET_LIST, payload: data });
    }
  }, [data, dispatch]);

  return (
    <div className={classes.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        filter={filter}
        dispatch={dispatch}
      />
      <div style={{ height: 'calc(100% - 64px)' }}>
        <VehicleList vehicles={filteredList} setCurrent={setCurrent} />
      </div>
    </div>
  );
}

export default VehicleTable;
