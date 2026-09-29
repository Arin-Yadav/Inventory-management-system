import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // base URL
});

// Request Interceptor = Runs before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor = Runs after every response
api.interceptors.response.use(
  (response) => {
    response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized - clear token and redirect
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
