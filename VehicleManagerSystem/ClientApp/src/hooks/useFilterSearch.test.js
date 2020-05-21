import { renderHook, act } from '@testing-library/react-hooks';
import useFilterSearch from './useFilterSearch';

const initialValues = {
  searchPhrase: '',
  filter: 'name',
  list: [
    { name: 'Coretex Truck', model: 'Tesla x.x', tags: ['NZ', 'Auckland'] },
    { name: 'Alex Truck', model: 'Boxcar 0.1.9', tags: ['SWE', 'Stockholm'] },
  ],
  filteredList: [
    { name: 'Coretex Truck', model: 'Tesla x.x', tags: ['NZ', 'Auckland'] },
    { name: 'Alex Truck', model: 'Boxcar 0.1.9', tags: ['SWE', 'Stockholm'] },
  ],
};

test('should use filter search', () => {
  const { result } = renderHook(() => useFilterSearch(initialValues));

  const [values, onChange] = result.current;
  expect(values).toEqual(initialValues);
  expect(typeof onChange).toBe('function');
});

test('should be able to change list', () => {
  const { result } = renderHook(() => useFilterSearch(initialValues));

  let [_, onChange, setList] = result.current;

  act(() => {
    setList([
      { name: 'Vodafone Truck', model: 'Tesla x.x', tags: ['NZ', 'Auckland'] },
      {
        name: 'A Cool Truck',
        model: 'Boxcar 0.1.9',
        tags: ['SWE', 'Stockholm'],
      },
    ]);
  });

  const { searchPhrase, filter, list, filteredList } = result.current[0];
  expect(searchPhrase).toBe('');
  expect(filter).toBe('name');
  expect(list).toEqual([
    { name: 'Vodafone Truck', model: 'Tesla x.x', tags: ['NZ', 'Auckland'] },
    { name: 'A Cool Truck', model: 'Boxcar 0.1.9', tags: ['SWE', 'Stockholm'] },
  ]);
  expect(filteredList).toEqual([
    { name: 'Vodafone Truck', model: 'Tesla x.x', tags: ['NZ', 'Auckland'] },
    { name: 'A Cool Truck', model: 'Boxcar 0.1.9', tags: ['SWE', 'Stockholm'] },
  ]);
});

test('should filter by name "alex"', () => {
  const { result } = renderHook(() => useFilterSearch(initialValues));

  const [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'searchPhrase', value: 'alex' } });
  });

  const { searchPhrase, filteredList } = result.current[0];
  expect(searchPhrase).toBe('alex');
  expect(filteredList).toEqual([
    { name: 'Alex Truck', model: 'Boxcar 0.1.9', tags: ['SWE', 'Stockholm'] },
  ]);
});

test('should filter by model "x.x"', () => {
  const { result } = renderHook(() => useFilterSearch(initialValues));

  let [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'filter', value: 'model' } });
  });

  [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'searchPhrase', value: 'Tesla' } });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('Tesla');
  expect(filter).toBe('model');
  expect(filteredList).toEqual([
    { name: 'Coretex Truck', model: 'Tesla x.x', tags: ['NZ', 'Auckland'] },
  ]);
});

test('should filter by tag "SWE"', () => {
  const { result } = renderHook(() => useFilterSearch(initialValues));

  let [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'filter', value: 'tags' } });
  });

  [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'searchPhrase', value: 'SWE' } });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('SWE');
  expect(filter).toBe('tags');
  expect(filteredList).toEqual([
    { name: 'Alex Truck', model: 'Boxcar 0.1.9', tags: ['SWE', 'Stockholm'] },
  ]);
});

test('should find nothing on filter by name "Arcombe"', () => {
  const { result } = renderHook(() => useFilterSearch(initialValues));

  const [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'searchPhrase', value: 'Arcombe' } });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('Arcombe');
  expect(filter).toBe('name');
  expect(filteredList).toEqual([]);
});

test('should be able to go back to original list without search phrase', () => {
  const { result } = renderHook(() => useFilterSearch(initialValues));

  let [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'searchPhrase', value: 'Arcombe' } });
  });

  [_, onChange] = result.current;

  act(() => {
    onChange({ target: { name: 'searchPhrase', value: '' } });
  });

  const { searchPhrase, filter, filteredList } = result.current[0];
  expect(searchPhrase).toBe('');
  expect(filter).toBe('name');
  expect(filteredList).toEqual([
    { name: 'Coretex Truck', model: 'Tesla x.x', tags: ['NZ', 'Auckland'] },
    { name: 'Alex Truck', model: 'Boxcar 0.1.9', tags: ['SWE', 'Stockholm'] },
  ]);
});
