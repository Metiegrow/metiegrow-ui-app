import axios from 'axios';

const API_URL = 'http://localhost:9001/availabilityBookings';
const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;

export const getAvailability = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const postAvailability = async (booking) => {
  const response = await axios.post(API_URL, booking);
  return response.data;
};

export const deleteAvailability = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getMentorAvailability = async (mentorId) => {
  const response = await axios.get(`${URL}/${mentorId}/availability`);
  return response.data;
};
