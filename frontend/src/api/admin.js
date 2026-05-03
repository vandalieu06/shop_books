import api from "./client";

export const adminApi = {
	getMetrics: () => api.get("/admin/metrics"),

	getAllOrders: (params = {}) => {
		const query = new URLSearchParams(params).toString();
		return api.get(`/admin/orders${query ? `?${query}` : ""}`);
	},

	getOrderById: (id) => api.get(`/admin/orders/${id}`),

	updateOrderStatus: (id, status) =>
		api.put(`/admin/orders/${id}/status`, { status }),

	getAllUsers: (params = {}) => {
		const query = new URLSearchParams(params).toString();
		return api.get(`/admin/users${query ? `?${query}` : ""}`);
	},

	getUserById: (id) => api.get(`/admin/users/${id}`),

	updateUser: (id, data) => api.put(`/admin/users/${id}`, data),

	deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

export default adminApi;