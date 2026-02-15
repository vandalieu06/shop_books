const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
	constructor(baseURL) {
		this.baseURL = baseURL;
		this.token = localStorage.getItem('auth_token');
	}

	getHeaders() {
		const headers = {
			'Content-Type': 'application/json',
		};
		if (this.token) {
			headers['Authorization'] = `Bearer ${this.token}`;
		}
		return headers;
	}

	setToken(token) {
		this.token = token;
		if (token) {
			localStorage.setItem('auth_token', token);
		} else {
			localStorage.removeItem('auth_token');
		}
	}

	async request(endpoint, options = {}) {
		const url = `${this.baseURL}${endpoint}`;
		const config = {
			...options,
			headers: {
				...this.getHeaders(),
				...options.headers,
			},
		};

		try {
			const response = await fetch(url, config);
			const data = await response.json();

			if (!response.ok) {
				throw {
					status: response.status,
					message: data.message || 'Error en la solicitud',
					data,
				};
			}

			return data;
		} catch (error) {
			if (error.status === 401) {
				this.setToken(null);
				window.dispatchEvent(new Event('auth:logout'));
			}
			throw error;
		}
	}

	async get(endpoint) {
		return this.request(endpoint, { method: 'GET' });
	}

	async post(endpoint, body) {
		return this.request(endpoint, {
			method: 'POST',
			body: JSON.stringify(body),
		});
	}

	async put(endpoint, body) {
		return this.request(endpoint, {
			method: 'PUT',
			body: JSON.stringify(body),
		});
	}

	async delete(endpoint) {
		return this.request(endpoint, { method: 'DELETE' });
	}
}

export const api = new ApiClient(API_BASE_URL);
export default api;
