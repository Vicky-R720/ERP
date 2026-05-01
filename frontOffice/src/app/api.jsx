import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  // si tu mets un proxy Vite plus tard, tu peux remplacer par: baseURL: "/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.assign("/auth/login");
    }
    return Promise.reject(err);
  },
);