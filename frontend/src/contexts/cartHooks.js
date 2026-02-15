import { useContext } from 'react';
import { createContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart debe ser usado dentro de un CartProvider');
	}
	return context;
};

export { CartContext };
