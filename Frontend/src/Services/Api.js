import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://orange-potato-v677rpp4vqr3xjj5-8000.app.github.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const attachAuthInterceptor = (getToken) => {
  const interceptorId = api.interceptors.request.use(
    async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // ✅ CORRECT
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return interceptorId;
};