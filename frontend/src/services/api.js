import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: "https://learnify-8.onrender.com/api",
});

// Attach JWT token to all requests
=======
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Attach JWT token
>>>>>>> 3abb815 (updated)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
<<<<<<< HEAD
  
=======
>>>>>>> 3abb815 (updated)
});

export default API;
