import { useState } from 'react';

export default (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    const { name, value } = e.target;

    const filter = name === 'filter' ? value : values.filter;
    const searchPhrase = name === 'searchPhrase' ? value : values.searchPhrase;
    const filtered = filterList(values.list, searchPhrase, filter);

    setValues((values) => {
      return { ...values, [name]: value, filteredList: filtered };
    });
  };

  const setList = (newList) => {
    const { searchPhrase, filter } = values;
    const filtered = filterList(newList, searchPhrase, filter);
    setValues((values) => {
      return { ...values, list: newList, filteredList: filtered };
    });
  };

  const update = (value) => {
    setValues((values) => {
      return {
        ...values,
        list: values.list.map((x) => (x.id === value.id ? value : x)),
        filteredList: values.filteredList.map((x) =>
          x.id === value.id ? value : x
        ),
      };
    });
  };

  const add = (value) => {
    const filtered = filterList([value], values.searchPhrase, values.filter);
    setValues((values) => {
      return {
        ...values,
        list: [...values.list, value],
        filteredList: [...values.filteredList, ...filtered],
      };
    });
  };

  const remove = (id) => {
    setValues((values) => {
      return {
        ...values,
        list: values.list.filter((value) => value.id !== id),
        filteredList: values.filteredList.filter((value) => value.id !== id),
      };
    });
  };

  return [values, onChange, setList, update, add, remove];
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
