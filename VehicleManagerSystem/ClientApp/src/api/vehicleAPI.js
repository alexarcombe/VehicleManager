import axios from 'axios';

const vehicleAPI = axios.create({
  baseURL: 'api/vehicles',
});

export const postVehicle = async (vehicle) => {
  console.log(vehicle);
  let res;
  try {
    res = await axios.post(`api/vehicles`, vehicle);
  } catch (e) {
    console.log(e);
  }
  console.log('res');
  console.log(res);
  return res.data;
};

export const putVehicle = async (id, vehicle) => {
  const res = await vehicleAPI.put(`/${id}`, vehicle);
  return res.data;
};

export const removeVehicle = async (id) => {
  const res = await vehicleAPI.delete(`/${id}`);
  return res;
};
