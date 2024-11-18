import axios, { AxiosInstance } from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout();
    }

    return Promise.reject(error);
  }
);

function handleLogout() {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
}

export default instance;
