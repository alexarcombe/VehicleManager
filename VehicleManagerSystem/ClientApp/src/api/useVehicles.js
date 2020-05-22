import { useQuery } from 'react-query';
import axios from 'axios';

const getVehicles = async (_, customerId) => {
  let data = [];
  if (customerId !== '' && customerId !== undefined) {
    const res = await axios.get(`api/vehicles/${customerId}`);
    data = res.data;
  }
  return data;
};

export default function useVehicles(customerId) {
  return useQuery(['vehicles', customerId], getVehicles);
}
