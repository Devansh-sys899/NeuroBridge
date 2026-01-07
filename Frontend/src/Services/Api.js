import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SOCKET_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const attachAuthInterceptor = (getToken) => {
  const interceptorId = api.interceptors.request.use(
    async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return interceptorId;
};