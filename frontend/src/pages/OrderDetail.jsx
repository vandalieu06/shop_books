import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package, ArrowLeft, MapPin, X } from "lucide-react";
import { ordersApi } from "../api";

const statusColors = {
	Pending: "bg-yellow-100 text-yellow-800",
	Paid: "bg-blue-100 text-blue-800",
	Shipped: "bg-purple-100 text-purple-800",
	Delivered: "bg-green-100 text-green-800",
	Cancelled: "bg-red-100 text-red-800",
};

const OrderDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [cancelling, setCancelling] = useState(false);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const response = await ordersApi.getById(id);
				setOrder(response.data);
			} catch (err) {
				setError(err.message || "Failed to load order");
			} finally {
				setLoading(false);
			}
		};
		fetchOrder();
	}, [id]);

	const handleCancel = async () => {
		if (!confirm("Are you sure you want to cancel this order?")) return;

		setCancelling(true);
		try {
			await ordersApi.cancel(id);
			navigate("/orders");
		} catch (err) {
			alert(err.message || "Failed to cancel order");
		} finally {
			setCancelling(false);
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("es-ES", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getImage = (book) => {
		return (
			book?.image ||
			`https://images.placeholders.dev/?width=100&height=150&text=${encodeURIComponent(book?.name || "Book")}`
		);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="animate-pulse text-gray-400">Loading...</div>
			</div>
		);
	}

	if (error || !order) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center p-8">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Order not found
					</h2>
					<button
						onClick={() => navigate("/orders")}
						className="px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
					>
						Go to orders
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
						onClick={() => navigate("/orders")}
						className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to orders
					</button>
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-semibold text-gray-900">
								Order {order.order_code}
							</h1>
							<p className="text-sm text-gray-500 mt-1">
								Placed on {formatDate(order.createdAt)}
							</p>
						</div>
						<span
							className={`px-3 py-1 text-sm font-medium rounded-full ${
								statusColors[order.status] || "bg-gray-100 text-gray-800"
							}`}
						>
							{order.status}
						</span>
					</div>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white border border-gray-200">
							<div className="p-4 border-b border-gray-200">
								<h2 className="font-semibold text-gray-900 flex items-center gap-2">
									<Package className="w-4 h-4 text-red-700" />
									Items ({order.items?.length || 0})
								</h2>
							</div>
							<div className="divide-y divide-gray-100">
								{order.items?.map((item, index) => (
									<div
										key={index}
										className="p-4 flex gap-4"
									>
										<img
											src={getImage(item.book)}
											alt={item.title}
											className="w-16 h-24 object-cover"
										/>
										<div className="flex-1">
											<h3 className="font-medium text-gray-900">
												{item.title}
											</h3>
											<p className="text-sm text-gray-500 mt-1">
												Qty: {item.quantity}
											</p>
											<p className="text-sm font-medium text-gray-900 mt-2">
												{(item.price * item.quantity).toFixed(2)}€
											</p>
										</div>
										<p className="text-sm text-gray-900">
											{item.price.toFixed(2)}€
										</p>
									</div>
								))}
							</div>
						</div>

						{order.shippingAddress && (
							<div className="bg-white border border-gray-200">
								<div className="p-4 border-b border-gray-200">
									<h2 className="font-semibold text-gray-900 flex items-center gap-2">
										<MapPin className="w-4 h-4 text-red-700" />
										Shipping address
									</h2>
								</div>
								<div className="p-4">
									<p className="text-sm text-gray-600">
										{order.shippingAddress.street}
									</p>
									<p className="text-sm text-gray-600">
										{order.shippingAddress.zipcode},{" "}
										{order.shippingAddress.city}
									</p>
									<p className="text-sm text-gray-600">
										{order.shippingAddress.country}
									</p>
								</div>
							</div>
						)}
					</div>

					<div>
						<div className="bg-gray-50 border border-gray-200 p-6 sticky top-20">
							<h2 className="font-semibold text-gray-900 mb-4">
								Order summary
							</h2>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-gray-500">Subtotal</span>
									<span className="text-gray-900">
										{order.total_price?.toFixed(2)}€
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-500">Shipping</span>
									<span className="text-gray-900">Free</span>
								</div>
								<div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
									<span>Total</span>
									<span>{order.total_price?.toFixed(2)}€</span>
								</div>
							</div>

							{order.status === "Pending" && (
								<button
									onClick={handleCancel}
									disabled={cancelling}
									className="w-full mt-6 px-4 py-2 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
								>
									<X className="w-4 h-4" />
									{cancelling ? "Cancelling..." : "Cancel order"}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;