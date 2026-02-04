import {
	BookOpen,
	Menu,
	Minus,
	Plus,
	Search,
	ShoppingCart,
	Trash2,
	X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "../../contexts/CartContext";

const NAV_PAGES = ["inicio", "categorías", "bestsellers", "ofertas"];

// --- Sub-componente: Item individual del carrito ---
const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
	<div className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
		<img
			src={item.image}
			alt={item.title}
			className="w-16 h-20 object-cover rounded-lg shrink-0"
		/>
		<div className="flex-1 flex flex-col justify-between py-1">
			<div className="flex justify-between items-start gap-2">
				<h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">
					{item.title}
				</h3>
				<button
					type="button"
					onClick={() => onRemove(item.id)}
					className="text-gray-400 hover:text-red-500 transition-colors p-1"
				>
					<Trash2 className="w-4 h-4" />
				</button>
			</div>
			<div className="flex items-center justify-between mt-2">
				<div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
					<button
						type="button"
						onClick={() => onUpdateQuantity(item.id, -1)}
						className="p-1 hover:bg-gray-200 text-gray-600"
					>
						<Minus className="w-3 h-3" />
					</button>
					<span className="px-2 text-xs font-bold text-gray-700 min-w-6 text-center">
						{item.quantity}
					</span>
					<button
						type="button"
						onClick={() => onUpdateQuantity(item.id, 1)}
						className="p-1 hover:bg-gray-200 text-gray-600"
					>
						<Plus className="w-3 h-3" />
					</button>
				</div>
				<span className="text-sm font-bold text-amber-600">
					{(item.price * item.quantity).toFixed(2)}€
				</span>
			</div>
		</div>
	</div>
);

// --- Componente Header Principal ---
export default function Header() {
	const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem } =
		useCart();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Cálculos derivados de las props
	const cartCount = useMemo(
		() => cartItems.reduce((acc, item) => acc + item.quantity, 0),
		[cartItems],
	);

	const totalPrice = useMemo(
		() => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
		[cartItems],
	);

	return (
		<>
			<header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 sm:h-20">
						{/* Logo y Menú Móvil */}
						<div className="flex items-center gap-2">
							<button
								type="button"
								className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								<Menu className="w-6 h-6" />
							</button>
							<div className="flex items-center space-x-2 group cursor-pointer">
								<div className="bg-amber-600 p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
									<BookOpen className="w-5 h-5 text-white" />
								</div>
								<span className="text-lg sm:text-xl font-black tracking-tighter text-gray-900 uppercase">
									Akira<span className="text-amber-600">Shop</span>
								</span>
							</div>
						</div>

						{/* Navegación Desktop */}
						<nav className="hidden md:flex items-center space-x-8">
							{NAV_PAGES.map((p) => (
								<a
									key={p}
									href={`#${p}`}
									className="text-gray-600 hover:text-amber-600 font-medium transition-colors capitalize"
								>
									{p}
								</a>
							))}
						</nav>

						{/* Acciones */}
						<div className="flex items-center space-x-1 sm:space-x-4">
							<button
								type="button"
								className="p-2 text-gray-500 hover:text-amber-600 transition"
							>
								<Search className="w-5 h-5" />
							</button>
							<button
								type="button"
								onClick={() => setIsCartOpen(true)}
								className="group relative flex items-center bg-gray-900 hover:bg-amber-600 text-white px-3 sm:px-4 py-2 rounded-full transition-all shadow-md"
							>
								<ShoppingCart className="w-4 h-4 mr-2" />
								<span className="text-xs sm:text-sm font-bold">
									{cartCount}
								</span>
								{cartCount > 0 && (
									<span className="ml-2 pl-2 border-l border-white/20 text-xs hidden lg:inline">
										{totalPrice.toFixed(2)}€
									</span>
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Menú Móvil Desplegable */}
				{isMenuOpen && (
					<div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl">
						{NAV_PAGES.map((p) => (
							<a
								key={p}
								href={`#${p}`}
								className="block text-gray-700 font-bold capitalize px-2 py-1"
							>
								{p}
							</a>
						))}
					</div>
				)}
			</header>

			{/* --- CARRITO LATERAL (Drawer) --- */}
			<div
				className={`fixed inset-0 z-[100] transition-all duration-300 ${isCartOpen ? "visible" : "invisible"}`}
			>
				{/* Overlay */}
				<div
					className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0"}`}
					onClick={() => setIsCartOpen(false)}
				/>

				<div
					className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
				>
					<div className="flex items-center justify-between p-5 border-b border-gray-100">
						<h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
							<ShoppingCart className="w-5 h-5" /> Mi Carrito
						</h2>
						<button
							type="button"
							onClick={() => setIsCartOpen(false)}
							className="p-2 text-gray-400 hover:text-gray-900 transition"
						>
							<X className="w-6 h-6" />
						</button>
					</div>

					<div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/30">
						{cartItems.length > 0 ? (
							cartItems.map((item) => (
								<CartItem
									key={item.id}
									item={item}
									onUpdateQuantity={updateQuantity}
									onRemove={removeItem}
								/>
							))
						) : (
							<div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
								<ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
								<p className="text-sm">Tu carrito está vacío</p>
							</div>
						)}
					</div>

					{cartItems.length > 0 && (
						<div className="p-5 border-t border-gray-100 bg-white">
							<div className="flex justify-between text-xl font-black text-gray-900 mb-6">
								<span>Total</span>
								<span>{totalPrice.toFixed(2)}€</span>
							</div>
							<button
								type="button"
								className="w-full bg-gray-900 hover:bg-amber-600 text-white py-4 rounded-xl font-bold transition-colors shadow-lg"
							>
								Finalizar Pedido
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
