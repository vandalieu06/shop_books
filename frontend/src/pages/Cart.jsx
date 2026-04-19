import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "../contexts";

const Cart = () => {
	const { cartItems, updateQuantity, removeItem } = useCart();
	const navigate = useNavigate();

	const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	if (cartItems.length === 0) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center p-8">
					<ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Your cart is empty
					</h2>
					<p className="text-gray-500 text-sm mb-4">
						Add some books before checking out
					</p>
					<button
						onClick={() => navigate("/products")}
						className="px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						Browse catalog
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-gray-50 border-b border-gray-200">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back
					</button>
					<h1 className="text-2xl font-semibold text-gray-900">
						Shopping Cart ({itemCount})
					</h1>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-4">
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="flex gap-4 p-4 bg-white border border-gray-200 hover:border-gray-300 transition-colors"
							>
								<Link
									to={`/products/${item.id}`}
									className="shrink-0"
								>
									<img
										src={item.image}
										alt={item.title}
										className="w-20 h-28 object-cover"
									/>
								</Link>
								<div className="flex-1 flex flex-col justify-between">
									<div className="flex justify-between">
										<Link
											to={`/products/${item.id}`}
											className="text-sm font-medium text-gray-900 hover:text-red-700 line-clamp-2"
										>
											{item.title}
										</Link>
										<button
											type="button"
											onClick={() => removeItem(item.id)}
											className="text-gray-400 hover:text-red-600 p-1"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center border border-gray-200">
											<button
												type="button"
												disabled={item.quantity <= 1}
												onClick={() =>
													updateQuantity(item.id, -1)
												}
												className="p-2 hover:bg-gray-50 text-gray-500 disabled:opacity-50"
											>
												<Minus className="w-4 h-4" />
											</button>
											<span className="px-4 text-sm font-medium text-gray-700 min-w-10 text-center">
												{item.quantity}
											</span>
											<button
												type="button"
												onClick={() =>
													updateQuantity(item.id, 1)
												}
												className="p-2 hover:bg-gray-50 text-gray-500"
											>
												<Plus className="w-4 h-4" />
											</button>
										</div>
										<span className="text-base font-semibold text-gray-900">
											{(item.price * item.quantity).toFixed(2)}€
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					<div>
						<div className="bg-gray-50 border border-gray-200 p-6 sticky top-20">
							<h2 className="text-base font-semibold text-gray-900 mb-4">
								Order summary
							</h2>
							<div className="space-y-2 border-b border-gray-200 pb-4 mb-4">
								<div className="flex justify-between text-sm text-gray-500">
									<span>Items ({itemCount})</span>
									<span>{total.toFixed(2)}€</span>
								</div>
								<div className="flex justify-between text-sm text-gray-500">
									<span>Shipping</span>
									<span>Free</span>
								</div>
							</div>
							<div className="flex justify-between text-base font-semibold mb-4">
								<span>Total</span>
								<span>{total.toFixed(2)}€</span>
							</div>
							<button
								type="button"
								onClick={() => navigate("/checkout")}
								className="w-full bg-red-700 hover:bg-red-800 text-white py-3 font-medium transition-colors text-sm"
							>
								Proceed to checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;