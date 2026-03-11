import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, MapPin, Trash2, X, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "../contexts";
import { ordersApi } from "../api";
import { useAuth } from "../contexts/authHooks";

const Checkout = () => {
	const { cartItems, removeItem } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();

	const [shippingAddress, setShippingAddress] = useState({
		street: user?.address?.street || "",
		city: user?.address?.city || "",
		zipcode: user?.address?.postal_code || "",
		country: user?.address?.country || "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const orderData = {
				items: cartItems.map((item) => ({
					book: item.id,
					title: item.title,
					quantity: item.quantity,
					price: item.price,
				})),
				total_price: total,
				shippingAddress: {
					street: shippingAddress.street,
					city: shippingAddress.city,
					zipcode: shippingAddress.zipcode,
					country: shippingAddress.country,
				},
			};

			const response = await ordersApi.create(orderData);
			if (response.status === "success") {
				setSuccess(true);
			}
		} catch (err) {
			setError(err.message || "Error al procesar el pedido");
		} finally {
			setLoading(false);
		}
	};

	if (cartItems.length === 0 && !success) {
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

	if (success) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center p-8 max-w-md">
					<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Order placed!
					</h2>
					<p className="text-gray-500 text-sm mb-6">
						Thank you for your purchase. You will receive a confirmation email
						shortly.
					</p>
					<button
						onClick={() => navigate("/products")}
						className="px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						Continue shopping
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
					<h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<form onSubmit={handleSubmit}>
							<div className="bg-white border border-gray-200 p-6">
								<h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
									<MapPin className="w-4 h-4 text-red-700" />
									Shipping address
								</h2>

								{error && (
									<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
										{error}
									</div>
								)}

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="sm:col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1">
											Street address
										</label>
										<input
											type="text"
											required
											value={shippingAddress.street}
											onChange={(e) =>
												setShippingAddress({
													...shippingAddress,
													street: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1">
											City
										</label>
										<input
											type="text"
											required
											value={shippingAddress.city}
											onChange={(e) =>
												setShippingAddress({
													...shippingAddress,
													city: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1">
											Postal code
										</label>
										<input
											type="text"
											required
											value={shippingAddress.zipcode}
											onChange={(e) =>
												setShippingAddress({
													...shippingAddress,
													zipcode: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
										/>
									</div>
									<div className="sm:col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1">
											Country
										</label>
										<input
											type="text"
											required
											value={shippingAddress.country}
											onChange={(e) =>
												setShippingAddress({
													...shippingAddress,
													country: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
										/>
									</div>
								</div>
							</div>
						</form>
					</div>

					<div>
						<div className="bg-gray-50 border border-gray-200 p-6 sticky top-20">
							<h2 className="text-base font-semibold text-gray-900 mb-4">
								Order summary
							</h2>

							<div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
								{cartItems.map((item) => (
									<div
										key={item.id}
										className="flex gap-3 bg-white p-2 border border-gray-100"
									>
										<img
											src={item.image}
											alt={item.title}
											className="w-12 h-16 object-cover"
										/>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 line-clamp-1">
												{item.title}
											</p>
											<p className="text-xs text-gray-500">
												Qty: {item.quantity}
											</p>
											<p className="text-sm font-medium text-gray-900">
												{(item.price * item.quantity).toFixed(2)}€
											</p>
										</div>
										<button
											type="button"
											onClick={() => removeItem(item.id)}
											className="text-gray-400 hover:text-red-600 p-1"
										>
											<Trash2 className="w-3.5 h-3.5" />
										</button>
									</div>
								))}
							</div>

							<div className="border-t border-gray-200 pt-3 space-y-2">
								<div className="flex justify-between text-sm">
									<span className="text-gray-500">Subtotal</span>
									<span className="text-gray-900">{total.toFixed(2)}€</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-500">Shipping</span>
									<span className="text-gray-900">Free</span>
								</div>
								<div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
									<span>Total</span>
									<span>{total.toFixed(2)}€</span>
								</div>
							</div>

							<button
								type="submit"
								disabled={loading || cartItems.length === 0}
								onClick={handleSubmit}
								className="w-full mt-4 bg-red-700 hover:bg-red-800 disabled:bg-gray-300 text-white py-3 font-medium transition-colors text-sm"
							>
								{loading ? "Processing..." : "Place order"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
