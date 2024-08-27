import axios from "axios";

const axiosConfig = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export default axiosConfig;