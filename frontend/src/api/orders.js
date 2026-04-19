import api from "./client";

export const ordersApi = {
	create: (orderData) => api.post("/orders", orderData),
	getAll: () => api.get("/orders"),
	getById: (id) => api.get(`/orders/${id}`),
	cancel: (id) => api.put(`/orders/${id}/cancel`),
};

export const checkoutApi = {
	createSession: (items) => api.post("/checkout/create-session", { items }),
};

export default ordersApi;
