import axios from 'axios';
import { setupInterceptors } from './interceptors';

/**
 * Configured axios instance for all API calls
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_BACKEND,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Setup request/response interceptors
setupInterceptors(axiosInstance);

export default axiosInstance;
