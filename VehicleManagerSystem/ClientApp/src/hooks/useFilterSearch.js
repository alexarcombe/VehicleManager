import { useReducer } from 'react';
import { CHANGE, SET_LIST, ADD, UPDATE, REMOVE } from '../actions/types';

const onChange = (state, payload) => {
  const { name, value } = payload;

  const filter = name === 'filter' ? value : state.filter;
  const searchPhrase = name === 'searchPhrase' ? value : state.searchPhrase;
  const filtered = filterList(state.list, searchPhrase, filter);

  return { ...state, [name]: value, filteredList: filtered };
};

const setList = (state, payload) => {
  const { searchPhrase, filter } = state;
  const filtered = filterList(payload, searchPhrase, filter);
  return { ...state, list: payload, filteredList: filtered };
};

const add = (state, payload) => {
  const filtered = filterList([payload], state.searchPhrase, state.filter);

  return {
    ...state,
    list: [...state.list, payload],
    filteredList: [...state.filteredList, ...filtered],
  };
};

const update = (state, payload) => {
  return {
    ...state,
    list: state.list.map((value) =>
      value.id === payload.id ? payload : value
    ),
    filteredList: state.filteredList.map((value) =>
      value.id === payload.id ? payload : value
    ),
  };
};

const remove = (state, payload) => {
  return {
    ...state,
    list: state.list.filter((value) => value.id !== payload),
    filteredList: state.filteredList.filter((value) => value.id !== payload),
  };
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case CHANGE:
      return onChange(state, payload);
    case SET_LIST:
      return setList(state, payload);
    case ADD:
      return add(state, payload);
    case UPDATE:
      return update(state, payload);
    case REMOVE:
      return remove(state, payload);
  }
};

export default (initialValues = {}) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return [state, dispatch];
};

const filterList = (list, searchPhrase, filter) => {
  return list.filter((element) => {
    if (Array.isArray(element[filter])) {
      return element[filter].reduce((acc, current) => {
        return (
          acc ||
          current.toLowerCase().indexOf(searchPhrase.toLowerCase()) !== -1
        );
      }, false);
    }
    return (
      element[filter].toLowerCase().indexOf(searchPhrase.toLowerCase()) !== -1
    );
  });
};
