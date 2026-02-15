import { useEffect, useState, useCallback, useRef } from 'react';
import { authApi } from '../api';
import { AuthContext } from './authHooks';

const AUTH_STORAGE_KEY = 'auth_user';

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const logoutRef = useRef(null);

	useEffect(() => {
		const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
		const token = localStorage.getItem('auth_token');

		if (storedUser && token) {
			setUser(JSON.parse(storedUser));
			setIsAuthenticated(true);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		const handleLogout = () => {
			if (logoutRef.current) {
				logoutRef.current();
			}
		};
		window.addEventListener('auth:logout', handleLogout);
		return () => window.removeEventListener('auth:logout', handleLogout);
	}, []);

	const login = useCallback(async (email, password) => {
		setLoading(true);
		setError(null);
		try {
			const response = await authApi.login({ email, password });
			
			if (response.status === 'success' && response.data) {
				const { accessToken, user: userData } = response.data;
				
				localStorage.setItem('auth_token', accessToken);
				localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
				
				setUser(userData);
				setIsAuthenticated(true);
				
				return { success: true, user: userData };
			}
			throw new Error(response.message || 'Error en el login');
		} catch (err) {
			const message = err.message || 'Error al iniciar sesión';
			setError(message);
			return { success: false, error: message };
		} finally {
			setLoading(false);
		}
	}, []);

	const register = useCallback(async (userData) => {
		setLoading(true);
		setError(null);
		try {
			const response = await authApi.register(userData);
			
			if (response.status === 'success' && response.data) {
				const { accessToken, user: newUser } = response.data;
				
				localStorage.setItem('auth_token', accessToken);
				localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
				
				setUser(newUser);
				setIsAuthenticated(true);
				
				return { success: true, user: newUser };
			}
			throw new Error(response.message || 'Error en el registro');
		} catch (err) {
			const message = err.message || 'Error al registrar usuario';
			setError(message);
			return { success: false, error: message };
		} finally {
			setLoading(false);
		}
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('auth_token');
		localStorage.removeItem(AUTH_STORAGE_KEY);
		setUser(null);
		setIsAuthenticated(false);
		setError(null);
	}, []);

	logoutRef.current = logout;

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				loading,
				error,
				login,
				register,
				logout,
				clearError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
