import api from './client';

export const authApi = {
	login: (credentials) => api.post('/auth/login', credentials),
	
	register: (userData) => api.post('/auth/register', userData),
	
	logout: () => api.post('/auth/logout'),
	
	me: () => api.get('/auth/me'),
	
	refreshToken: () => api.post('/auth/refresh'),
};

export default authApi;
