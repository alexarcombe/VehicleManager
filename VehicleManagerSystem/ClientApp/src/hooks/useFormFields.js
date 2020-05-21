import { useState } from 'react';

const useFormFields = ({ initialValues, validate, onSubmit }) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((values) => {
      return { ...values, [id]: value };
    });
  };

  const setFormFields = (values) => {
    setValues({ ...initialValues, ...values });
    setErrors({});
  };

  const handleSubmit = async () => {
    let errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      onSubmit(values);
      setFormFields({});
    }
  };

  return [values, errors, handleChange, handleSubmit, setFormFields];
};

export default useFormFields;
