import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState(() => {
		const saved = localStorage.getItem("akira_cart");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("akira_cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (book) => {
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
					image: `https://images.placeholders.dev/?width=400&height=600&text=${book.name}`,
				},
			];
		});
		setIsCartOpen(true);
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

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);
