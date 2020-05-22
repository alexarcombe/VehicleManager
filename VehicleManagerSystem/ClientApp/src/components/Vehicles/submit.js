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
  console.log(values);
  if (hasErrors) {
    formDispatch({ type: SET_ERRORS, payload: errors });
  } else {
    let { tags, id, ...rest } = values;
    tags = tags.split(',').map((tag) => tag.trimLeft());
    if (!id) {
      const vehicle = await postVehicle({ customerId: auth, tags, ...rest });
      searchDispatch({ type: ADD, payload: vehicle });
      formDispatch({
        type: SET_FIELDS,
        payload: { values: initialFormValues, mode: 'Create' },
      });
    } else {
      const vehicle = await putVehicle(id, { id, tags, ...rest });
      searchDispatch({ type: UPDATE, payload: vehicle });
      formDispatch({
        type: SET_MODE,
        payload: 'Selected',
      });
    }
  }
};
