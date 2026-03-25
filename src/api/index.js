import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5001/api",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const api = {
    getFlowers: async () => {
        const res = await apiClient.get("/flowers");
        return res.data;
    },
    createFlower: async (data) => {
        const res = await apiClient.post("/flowers", data);
        return res.data;
    },
    updateFlower: async (id, data) => {
        const res = await apiClient.patch(`/flowers/${id}`, data);
        return res.data;
    },
    deleteFlower: async (id) => {
        const res = await apiClient.delete(`/flowers/${id}`);
        return res.data;
    },
    registerUser: async(userData) => { 
        const res = await apiClient.post("/register",userData);
        return res.data;
    },
    updateUser: async(id,userData) => { //changePassword
        const res = await apiClient.patch(`/login/${id}`,userData);
        return res.data;
    },
    loginUser: async(credentials) => {
        const res = await apiClient.post(`/login`, credentials);
        if (res.data.token) {
            localStorage.setItem("token", res.data.token);
        }
        return res.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },
};
