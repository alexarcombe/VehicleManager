import validate from './validate';
import { postVehicle, putVehicle } from '../../api/vehicleAPI';
import {
  SET_ERRORS,
  SET_MODE,
  SET_FIELDS,
  ADD,
  UPDATE,
} from '../../actions/types';
import { initialFormValues } from '../../init';

export default async (auth, values, searchDispatch, formDispatch) => {
  const { errors, hasErrors } = validate(values);
  if (hasErrors) {
    formDispatch({ type: SET_ERRORS, payload: errors });
  } else {
    let { tags, id, ...rest } = values;
    tags = tags.split(',').map((tag) => tag.trimLeft());
    if (!id) {
      const { data, error } = await postVehicle({
        customerId: auth,
        tags,
        ...rest,
      });
      if (!error) {
        searchDispatch({ type: ADD, payload: data });
        formDispatch({
          type: SET_FIELDS,
          payload: { values: initialFormValues, mode: 'Create' },
        });
      } else {
        console.log(error);
      }
    } else {
      const { data, error } = await putVehicle(id, { id, tags, ...rest });
      if (!error) {
        searchDispatch({ type: UPDATE, payload: data });
        formDispatch({
          type: SET_MODE,
          payload: 'Selected',
        });
      } else {
        console.log(error);
      }
    }
  }
};
