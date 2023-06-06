import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || null,
});

export default api;
