import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import VehicleList from './VehicleList';
import SearchBar from './SearchBar';
import { AuthContext } from '../../context/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function VehicleTable(props) {
  const classes = useStyles();
  const {
    setCurrent,
    values: { searchPhrase, filter, filteredList },
    onChange,
    setList,
  } = props;
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log('fetch data');
    const fetchData = async () => {
      const result = await axios.get(`api/vehicles/${auth}`);
      setList(result.data);
    };
    fetchData();
  }, [auth]);

  return (
    <div className={classes.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        filter={filter}
        onChange={onChange}
      />
      <div style={{ height: 'calc(100% - 64px)' }}>
        <VehicleList vehicles={filteredList} setCurrent={setCurrent} />
      </div>
    </div>
  );
}

export default VehicleTable;
