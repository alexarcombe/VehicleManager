import { renderHook, act } from '@testing-library/react-hooks';
import useFormFields from './useFormFields';

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

test('should use form fields', () => {
  const { result } = renderHook(() => useFormFields({ initialValues }));

  const [values, handleChange, setFormFields] = result.current;

  expect(values).toEqual(initialValues);
  expect(typeof handleChange).toBe('function');
  expect(typeof setFormFields).toBe('function');
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
  const { result } = renderHook(() => useFormFields({ initialValues }));

  const [_, handleChange, setFormFields] = result.current;

  act(() => {
    for (let [key, value] of Object.entries(updatedValues)) {
      handleChange({ target: { id: key, value: value } });
    }
  });

  const [updated] = result.current;

  expect(updated).toEqual(updatedValues);
});

test('should set all form values', () => {
  const { result } = renderHook(() => useFormFields({ initialValues }));

  const [values, handleChange, setFormFields] = result.current;

  act(() => {
    setFormFields(updatedValues);
  });

  const [updated] = result.current;
  expect(updated).toEqual(updatedValues);
});

test('should reset form values', () => {
  const { result } = renderHook(() => useFormFields({ initialValues }));

  const [_, handleChange, setFormFields] = result.current;

  act(() => {
    handleChange({ target: { id: 'name', value: 'Truck' } });
  });

  const [updated] = result.current;
  expect(updated.name).toBe('Truck');

  act(() => {
    setFormFields({});
  });

  const [reset] = result.current;
  expect(reset).toEqual(initialValues);
});
