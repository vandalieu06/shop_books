import { useContext } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe ser usado dentro de un AuthProvider');
	}
	return context;
};

export { AuthContext };
