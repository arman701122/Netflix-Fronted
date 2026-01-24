import axios from "axios";

const API = axios.create({
  baseURL: "https://netflix-backend-a4yz.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;
