import axios from 'axios';

const vehicleAPI = axios.create({
  baseURL: 'api/vehicles',
});

export const postVehicle = async (vehicle) => {
  let res;
  try {
    res = await axios.post(`api/vehicles`, vehicle);
  } catch (e) {
    return { res, error: e.message };
  }
  return { data: res.data };
};

export const putVehicle = async (id, vehicle) => {
  let res;
  try {
    res = await vehicleAPI.put(`/${id}`, vehicle);
  } catch (e) {
    return { res, error: e.message };
  }
  return { data: res.data };
};

export const removeVehicle = async (id) => {
  let res;
  try {
    res = await vehicleAPI.delete(`/${id}`);
  } catch (e) {
    return { res, error: e.message };
  }
  return { data: res.data };
};
