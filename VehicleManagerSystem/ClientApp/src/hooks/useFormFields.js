import { useReducer } from 'react';
import { CHANGE, SET_FIELDS, SET_ERRORS, SUBMIT } from '../actions/types';

// {values, mode, errors}

const onChange = (state, payload) => {
  const { id, value } = payload;
  return { ...state, values: { ...state.values, [id]: value } };
};

// const setFormFields = (values) => {
//   setValues({ ...initialValues, ...values });
//   setErrors({});
// };

const useFormFields = ({ initialValues, mode, validate, onSubmit }) => {
  // const [values, setValues] = useState(initialValues || {});
  // const [errors, setErrors] = useState({});
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    mode,
    errors: {},
  });

  const setFormFields = (payload) => {
    return {
      values: { ...initialValues, ...payload.values },
      mode: payload.mode,
      errors: {},
    };
  };

  const handleSubmit = (state) => {
    let errors = validate(state.values);
    if (Object.keys(errors).length > 0) {
      return { ...state, errors: payload };
    } else {
      onSubmit(values);
      return setFormFields({ payload: { values: {}, mode: 'Create' } });
    }
  };

  function reducer(state, { type, payload }) {
    switch (type) {
      case CHANGE:
        return onChange(state, payload);
      case SET_FIELDS:
        return setFormFields(payload);
      case SET_ERRORS:
        return { ...state, errors: payload };
      case SUBMIT:
        return handleSubmit(state);
      default:
        return state;
    }
  }

  // return [values, errors, handleChange, handleSubmit, setFormFields];
  return [state, dispatch];
};

export default useFormFields;
