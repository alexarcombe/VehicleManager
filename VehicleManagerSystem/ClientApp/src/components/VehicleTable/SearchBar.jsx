import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SearchBar(props) {
  const { searchPhrase, filter, onChange } = props;
  const classes = useStyles();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <TextField
          name="searchPhrase"
          label="Search phrase"
          value={searchPhrase}
          onChange={onChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="filter-label">Filter By</InputLabel>
        <Select
          labelId="filter-label"
          name="filter"
          value={filter}
          onChange={onChange}
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'model'}>Model</MenuItem>
          <MenuItem value={'tags'}>Tags</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
