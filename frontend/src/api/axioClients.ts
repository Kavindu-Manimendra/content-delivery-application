import axios from "axios";
import {getToken} from "../utils/storage.ts";

const api = axios.create({
    baseURL: 'http://localhost:9292/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;