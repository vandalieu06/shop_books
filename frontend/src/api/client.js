const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class ApiClient {
	constructor(baseURL) {
		this.baseURL = baseURL;
		this.refreshToken = localStorage.getItem("refresh_token");
		this.isRefreshing = false;
		this.refreshSubscribers = [];
	}

	getToken() {
		return localStorage.getItem("auth_token");
	}

	getHeaders() {
		const headers = {
			"Content-Type": "application/json",
		};
		const token = this.getToken();
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}
		return headers;
	}

	setToken(token, refreshToken = null) {
		if (token) {
			localStorage.setItem("auth_token", token);
		} else {
			localStorage.removeItem("auth_token");
		}
		if (refreshToken) {
			this.refreshToken = refreshToken;
			localStorage.setItem("refresh_token", refreshToken);
		} else {
			this.refreshToken = null;
			localStorage.removeItem("refresh_token");
		}
	}

	subscribe(callback) {
		this.refreshSubscribers.push(callback);
	}

	notify(newToken) {
		this.refreshSubscribers.forEach((callback) => callback(newToken));
		this.refreshSubscribers = [];
	}

	async refreshAccessToken() {
		if (this.isRefreshing) {
			return new Promise((resolve) => {
				this.subscribe((newToken) => {
					resolve(newToken);
				});
			});
		}

		this.isRefreshing = true;
		const storedRefreshToken = localStorage.getItem("refresh_token");

		if (!storedRefreshToken) {
			this.isRefreshing = false;
			return null;
		}

		try {
			const response = await fetch(`${this.baseURL}/auth/refresh`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refreshToken: storedRefreshToken }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const isInvalidToken = response.status === 401 || 
					response.status === 403 || 
					errorData.message?.includes("Token") ||
					errorData.message?.includes("denegado");
				
				if (isInvalidToken) {
					this.setToken(null, null);
					window.dispatchEvent(new Event("auth:logout"));
				}
				return null;
			}

			const data = await response.json();

			if (data.status === "success" && data.data) {
				const { accessToken, refreshToken: newRefreshToken } = data.data;
				this.setToken(accessToken, newRefreshToken);
				this.notify(accessToken);
				return accessToken;
			}

			return null;
		} catch (error) {
			console.error("Refresh token error (network):", error.message);
			return null;
		} finally {
			this.isRefreshing = false;
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
				const storedRefreshToken = localStorage.getItem("refresh_token");
				if ((response.status === 401 || response.status === 403) && storedRefreshToken) {
					const newToken = await this.refreshAccessToken();
					if (newToken) {
						config.headers["Authorization"] = `Bearer ${newToken}`;
						const retryResponse = await fetch(url, config);
						const retryData = await retryResponse.json();
						if (!retryResponse.ok) {
							throw {
								status: retryResponse.status,
								message: retryData.message || "Error en la solicitud",
								data: retryData,
							};
						}
						return retryData;
					}
				}
				throw {
					status: response.status,
					message: data.message || "Error en la solicitud",
					data,
				};
			}

			return data;
		} catch (error) {
			const storedRefreshToken = localStorage.getItem("refresh_token");
			const isAuthEndpoint = error?.data?.message?.includes("Token");
			if ((error.status === 401 || error.status === 403) && !storedRefreshToken && isAuthEndpoint) {
				this.setToken(null, null);
				window.dispatchEvent(new Event("auth:logout"));
			}
			throw error;
		}
	}

	async get(endpoint) {
		return this.request(endpoint, { method: "GET" });
	}

	async post(endpoint, body) {
		return this.request(endpoint, {
			method: "POST",
			body: JSON.stringify(body),
		});
	}

	async put(endpoint, body) {
		return this.request(endpoint, {
			method: "PUT",
			body: JSON.stringify(body),
		});
	}

	async delete(endpoint) {
		return this.request(endpoint, { method: "DELETE" });
	}
}

export const api = new ApiClient(API_BASE_URL);
export default api;
