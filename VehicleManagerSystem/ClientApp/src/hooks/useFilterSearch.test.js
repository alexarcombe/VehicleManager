import { renderHook, act } from '@testing-library/react-hooks';
import useFilterSearch from './useFilterSearch';
import { SET_LIST, CHANGE, ADD, UPDATE, REMOVE } from '../actions/types';

const initialValues = {
  searchPhrase: '',
  filter: 'name',
  list: [
    {
      id: '1',
      name: 'Coretex Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
    {
      id: '2',
      name: 'Alex Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ],
  filteredList: [
    {
      id: '1',
      name: 'Coretex Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
    {
      id: '2',
      name: 'Alex Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ],
};

let result, state, dispatch;
beforeEach(() => {
  const res = renderHook(() => useFilterSearch(initialValues));
  result = res.result;
  [state, dispatch] = result.current;
});

test('should use filter search', () => {
  expect(state).toEqual(initialValues);
  expect(typeof dispatch).toBe('function');
});

test('should do nothing on default dispatch', () => {
  act(() => {
    dispatch({});
  });
  [state, dispatch] = result.current;
  expect(state).toEqual(initialValues);
  expect(typeof dispatch).toBe('function');
});

const newList = [
  {
    id: '3',
    name: 'Vodafone Truck',
    model: 'Tesla x.x',
    tags: ['NZ', 'Auckland'],
  },
  {
    id: '4',
    name: 'A Cool Truck',
    model: 'Boxcar 0.1.9',
    tags: ['SWE', 'Stockholm'],
  },
];

test('should be able to change list', () => {
  act(() => {
    dispatch({ type: SET_LIST, payload: newList });
  });

  const [{ searchPhrase, filter, list, filteredList }] = result.current;
  expect(searchPhrase).toBe('');
  expect(filter).toBe('name');
  expect(list).toEqual([
    {
      id: '3',
      name: 'Vodafone Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
    {
      id: '4',
      name: 'A Cool Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ]);
  expect(filteredList).toEqual([
    {
      id: '3',
      name: 'Vodafone Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
    {
      id: '4',
      name: 'A Cool Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ]);
});

test('should filter by name "alex"', () => {
  act(() => {
    dispatch({
      type: CHANGE,
      payload: { name: 'searchPhrase', value: 'alex' },
    });
  });

  const [{ searchPhrase, filteredList }] = result.current;
  expect(searchPhrase).toBe('alex');
  expect(filteredList).toEqual([
    {
      id: '2',
      name: 'Alex Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ]);
});

test('should filter by model "x.x"', () => {
  act(() => {
    dispatch({ type: CHANGE, payload: { name: 'filter', value: 'model' } });
    dispatch({
      type: CHANGE,
      payload: { name: 'searchPhrase', value: 'Tesla' },
    });
  });

  const [{ searchPhrase, filter, filteredList }] = result.current;
  expect(searchPhrase).toBe('Tesla');
  expect(filter).toBe('model');
  expect(filteredList).toEqual([
    {
      id: '1',
      name: 'Coretex Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
  ]);
});

test('should filter by tag "SWE"', () => {
  act(() => {
    dispatch({ type: CHANGE, payload: { name: 'searchPhrase', value: 'SWE' } });
    dispatch({ type: CHANGE, payload: { name: 'filter', value: 'tags' } });
  });

  const [{ searchPhrase, filter, filteredList }] = result.current;
  expect(searchPhrase).toBe('SWE');
  expect(filter).toBe('tags');
  expect(filteredList).toEqual([
    {
      id: '2',
      name: 'Alex Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ]);
});

test('should find nothing on filter by name "Arcombe"', () => {
  act(() => {
    dispatch({
      type: CHANGE,
      payload: { name: 'searchPhrase', value: 'Arcombe' },
    });
  });

  const [{ searchPhrase, filter, filteredList }] = result.current;
  expect(searchPhrase).toBe('Arcombe');
  expect(filter).toBe('name');
  expect(filteredList).toEqual([]);
});

test('should be able to go back to original list without search phrase', () => {
  act(() => {
    dispatch({
      type: CHANGE,
      payload: { name: 'searchPhrase', value: 'Arcombe' },
    });
    dispatch({
      type: CHANGE,
      payload: { name: 'searchPhrase', value: '' },
    });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('');
  expect(filter).toBe('name');
  expect(filteredList).toEqual([
    {
      id: '1',
      name: 'Coretex Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
    {
      id: '2',
      name: 'Alex Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ]);
});

test('should add new items', () => {
  act(() => {
    dispatch({
      type: ADD,
      payload: {
        id: '3',
        name: 'Vodafone Truck',
        model: 'Tesla x.x',
        tags: ['NZ', 'Auckland'],
      },
    });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('');
  expect(filter).toBe('name');
  expect(filteredList).toEqual([
    {
      id: '1',
      name: 'Coretex Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
    {
      id: '2',
      name: 'Alex Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
    {
      id: '3',
      name: 'Vodafone Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
  ]);
});

test('should update "Coretext Truck" to "Coretex Car"', () => {
  act(() => {
    dispatch({
      type: UPDATE,
      payload: {
        id: '1',
        name: 'Coretex Car',
        model: 'Tesla x.x',
        tags: ['NZ', 'Auckland'],
      },
    });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('');
  expect(filter).toBe('name');
  expect(filteredList).toEqual([
    {
      id: '1',
      name: 'Coretex Car',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
    {
      id: '2',
      name: 'Alex Truck',
      model: 'Boxcar 0.1.9',
      tags: ['SWE', 'Stockholm'],
    },
  ]);
});

test('should remove id 2', () => {
  act(() => {
    dispatch({
      type: REMOVE,
      payload: '2',
    });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('');
  expect(filter).toBe('name');
  expect(filteredList).toEqual([
    {
      id: '1',
      name: 'Coretex Truck',
      model: 'Tesla x.x',
      tags: ['NZ', 'Auckland'],
    },
  ]);
});
