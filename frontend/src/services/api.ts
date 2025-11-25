import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, ERROR_MESSAGES } from '../utils/constants';
import { ApiResponse } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    const apiError = error.response?.data as ApiResponse;
    throw new Error(apiError?.error || ERROR_MESSAGES.GENERIC_ERROR);
  }
);

export default api;