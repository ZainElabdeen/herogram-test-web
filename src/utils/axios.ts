import axios, { AxiosInstance } from 'axios';

export const baseURL = import.meta.env.VITE_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;
