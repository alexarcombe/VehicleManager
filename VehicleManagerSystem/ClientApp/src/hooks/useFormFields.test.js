import { renderHook, act } from '@testing-library/react-hooks';
import useFormFields from './useFormFields';
import { SET_FIELDS, SET_ERRORS, SET_MODE, CHANGE } from '../actions/types';

const initialValues = {
  name: '',
  model: '',
  tags: [],
  speed: 0,
  latitude: 10,
  longitude: 10,
  sensors: [],
  comments: [],
};

let result, dispatch;
beforeEach(() => {
  const res = renderHook(() => useFormFields(initialValues));
  result = res.result;
  [, dispatch] = result.current;
});

test('should use form fields', () => {
  const [{ values, mode, errors }, dispatch] = result.current;

  expect(values).toEqual(initialValues);
  expect(mode).toEqual('Create');
  expect(errors).toEqual({});
  expect(typeof dispatch).toBe('function');
});

test('should do nothing on default dispatch', () => {
  act(() => {
    dispatch({});
  });
  const [{ values, mode, errors }] = result.current;
  expect(values).toEqual(initialValues);
  expect(mode).toEqual('Create');
  expect(errors).toEqual({});
  expect(typeof dispatch).toBe('function');
});

const updatedValues = {
  name: "John's car",
  model: 'Volvo330',
  tags: ['NZ', 'Auckland'],
  speed: 100,
  latitude: 50,
  longitude: 50,
  sensors: [{ name: 'cooling', value: '-10' }],
  comments: [
    {
      by: 'John',
      date: '2020-04-06',
      comment: 'The roads were a bit ruff to this truck.',
    },
  ],
};

test('should update values', () => {
  act(() => {
    for (let [key, value] of Object.entries(updatedValues)) {
      dispatch({ type: CHANGE, payload: { id: key, value: value } });
    }
  });

  const { values } = result.current[0];
  expect(values).toEqual(updatedValues);
});

test('should set all form fields', () => {
  act(() => {
    dispatch({
      type: SET_FIELDS,
      payload: { values: updatedValues, mode: 'Create' },
    });
  });

  const { values } = result.current[0];
  expect(values).toEqual(updatedValues);
});

test('should reset form values', () => {
  act(() => {
    dispatch({ type: CHANGE, payload: { id: 'name', value: 'Truck' } });
  });

  const {
    values: { name },
  } = result.current[0];
  expect(name).toBe('Truck');

  act(() => {
    dispatch({
      type: SET_FIELDS,
      payload: { values: initialValues, mode: 'Create' },
    });
  });

  const { values } = result.current[0];
  expect(values).toEqual(initialValues);
});

test('should set mode to Selected', () => {
  act(() => {
    dispatch({ type: SET_MODE, payload: 'Selected' });
  });
  const { mode } = result.current[0];
  expect(mode).toBe('Selected');
});

test('should set errors', () => {
  act(() => {
    dispatch({
      type: SET_ERRORS,
      payload: {
        name: 'name needs to be provided',
        speed: "speed can't be negative",
      },
    });
  });
  const { errors } = result.current[0];
  expect(errors).toEqual({
    name: 'name needs to be provided',
    speed: "speed can't be negative",
  });
});
