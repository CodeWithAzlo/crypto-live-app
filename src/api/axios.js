import axios from "axios";

const api = axios.create({
  baseURL: "https://api.freecryptoapi.com/v1",
  timeout: 15000,
});

// attach Bearer token from env automatically to every request for authentication get api key from VITE_API_KEY in .env file for https://freecryptoapi.com
api.interceptors.request.use((config) => {
  const key = import.meta.env.VITE_API_KEY;
  if (key) config.headers.Authorization = `Bearer ${key}`;
  return config;
}, (error) => Promise.reject(error));

// optional: response interceptor (logging / global error handling)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
