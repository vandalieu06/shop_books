import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartContext } from './cartHooks';

const CART_STORAGE_KEY = 'akira_cart';

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useLocalStorage(CART_STORAGE_KEY, []);

	const addToCart = (book, openCart = true) => {
		setCartItems((prev) => {
			const existing = prev.find((item) => item.id === book.isbn);
			if (existing) {
				return prev.map((item) =>
					item.id === book.isbn
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [
				...prev,
				{
					id: book.isbn,
					title: book.name,
					price: book.price,
					quantity: 1,
					image: book.image || `https://images.placeholders.dev/?width=400&height=600&text=${encodeURIComponent(book.name)}`,
				},
			];
		});
		if (openCart) {
			setIsCartOpen(true);
		}
	};

	const updateQuantity = (id, delta) => {
		setCartItems((prev) =>
			prev.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + delta) }
					: item,
			),
		);
	};

	const removeItem = (id) =>
		setCartItems((prev) => prev.filter((item) => item.id !== id));

	return (
		<CartContext.Provider
			value={{
				cartItems,
				isCartOpen,
				setIsCartOpen,
				addToCart,
				updateQuantity,
				removeItem,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
