import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, CreditCard, Lock, Loader2 } from "lucide-react";
import { useCart } from "../contexts";
import { checkoutApi } from "../api";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51TNws61qVP8Um7ZMcRIQcWEQyCcu0HHaxNNwvE9bZe5pkNI8dMsKzHI4D1aLMiHrO1sfG5RNETKbsvMbvAfF5AEe00zoWNPbig";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutPayment = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { clearCart } = useCart();

	const { cartItems, shippingAddress, total } = location.state || {};
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(null);

	if (!cartItems || cartItems.length === 0) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center p-8">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						No order data
					</h2>
					<button
						onClick={() => navigate("/cart")}
						className="px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						Go to cart
					</button>
				</div>
			</div>
		);
	}

	const handlePayment = async () => {
		setProcessing(true);
		setError(null);

		try {
			const items = cartItems.map((item) => ({
				book: item.id,
				quantity: item.quantity,
			}));

			const response = await checkoutApi.createSession(items);
			const { sessionId, url } = response.data;

			if (url) {
				window.location.href = url;
				return;
			}

			const stripe = await stripePromise;
			await stripe.redirectToCheckout({ sessionId });
		} catch (err) {
			const data = err.response?.data;
			let message = "Payment failed. Please try again.";
			if (data?.message) {
				try {
					const parsed = JSON.parse(data.message);
					message = parsed.map((e) => e.message).join(", ");
				} catch {
					message = data.message;
				}
			} else {
				message = err.message;
			}
			setError(message);
		} finally {
			setProcessing(false);
		}
	};

	const handleCancel = () => {
		navigate("/checkout");
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-gray-50 border-b border-gray-200">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<button
						onClick={handleCancel}
						className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back
					</button>
					<h1 className="text-2xl font-semibold text-gray-900">Payment</h1>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<div className="bg-white border border-gray-200 p-6">
							<h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
								<CreditCard className="w-4 h-4 text-red-700" />
								Payment details
							</h2>

							{error && (
								<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
									{error}
								</div>
							)}

							<div className="space-y-4">
								<div>
									<label className="block text-xs font-medium text-gray-500 mb-1">
										Card number
									</label>
									<input
										type="text"
										placeholder="1234 5678 9012 3456"
										className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1">
											Expiry date
										</label>
										<input
											type="text"
											placeholder="MM/YY"
											className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1">
											CVC
										</label>
										<input
											type="text"
											placeholder="123"
											className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
										/>
									</div>
								</div>
								<div>
									<label className="block text-xs font-medium text-gray-500 mb-1">
										Cardholder name
									</label>
									<input
										type="text"
										placeholder="John Doe"
										className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-red-700"
									/>
								</div>
							</div>

							<div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
								<Lock className="w-3 h-3" />
								<span>Your payment is secure</span>
							</div>
						</div>
					</div>

					<div>
						<div className="bg-gray-50 border border-gray-200 p-6 sticky top-20">
							<h2 className="text-base font-semibold text-gray-900 mb-4">
								Order summary
							</h2>

							<div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
								{cartItems.map((item) => (
									<div
										key={item.id}
										className="flex gap-3 bg-white p-2 border border-gray-100"
									>
										<img
											src={item.image}
											alt={item.title}
											className="w-10 h-14 object-cover"
										/>
										<div className="flex-1 min-w-0">
											<p className="text-xs font-medium text-gray-900 line-clamp-1">
												{item.title}
											</p>
											<p className="text-xs text-gray-500">
												Qty: {item.quantity}
											</p>
										</div>
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
								type="button"
								disabled={processing}
								onClick={handlePayment}
								className="w-full mt-4 bg-red-700 hover:bg-red-800 disabled:bg-gray-300 text-white py-3 font-medium transition-colors text-sm flex items-center justify-center gap-2"
							>
								{processing ? (
									<>
										<Loader2 className="w-4 h-4 animate-spin" />
										Processing...
									</>
								) : (
									`Pay ${total.toFixed(2)}€`
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPayment;