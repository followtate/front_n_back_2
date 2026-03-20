import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5001/api",
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
    }
};
