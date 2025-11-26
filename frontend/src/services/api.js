import axios from "axios";

const API = axios.create({
  baseURL: `${
    import.meta.env.PROD
      ? import.meta.env.VITE_API_URL   // ✔️ Production backend (Vercel)
      : "http://localhost:5000"        // ✔️ Local backend (when developing)
  }/api`,
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
