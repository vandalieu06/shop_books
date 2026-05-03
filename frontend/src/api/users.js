import { api } from "./client";

export const usersApi = {
	getAll: (page = 1, limit = 20) => api.get(`/admin/users?page=${page}&limit=${limit}`),
	getById: (id) => api.get(`/admin/users/${id}`),
	update: (id, userData) => api.put(`/admin/users/${id}`, userData),
	delete: (id) => api.delete(`/admin/users/${id}`),
};

export default usersApi;