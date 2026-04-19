import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import { ordersApi } from "../api";

const statusColors = {
	Pending: "bg-yellow-100 text-yellow-800",
	Paid: "bg-blue-100 text-blue-800",
	Shipped: "bg-purple-100 text-purple-800",
	Delivered: "bg-green-100 text-green-800",
	Cancelled: "bg-red-100 text-red-800",
};

const Orders = () => {
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await ordersApi.getAll();
				setOrders(response.data || []);
			} catch (err) {
				setError(err.message || "Failed to load orders");
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("es-ES", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="animate-pulse text-gray-400">Loading...</div>
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
					<h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
						{error}
					</div>
				)}

				{orders.length === 0 ? (
					<div className="text-center py-12">
						<Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
						<h2 className="text-lg font-medium text-gray-900 mb-2">
							No orders yet
						</h2>
						<p className="text-gray-500 text-sm mb-4">
							When you place an order, it will appear here
						</p>
						<button
							onClick={() => navigate("/products")}
							className="px-5 py-2 bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition-colors"
						>
							Browse catalog
						</button>
					</div>
				) : (
					<div className="space-y-4">
						{orders.map((order) => (
							<div
								key={order._id}
								className="bg-white border border-gray-200 hover:border-gray-300 transition-colors"
							>
								<div className="p-4 sm:p-6">
									<div className="flex items-start justify-between flex-wrap gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-3 mb-2">
												<span className="text-sm font-medium text-gray-900">
													{order.order_code}
												</span>
												<span
													className={`px-2 py-0.5 text-xs font-medium rounded-full ${
														statusColors[order.status] || "bg-gray-100 text-gray-800"
													}`}
												>
													{order.status}
												</span>
											</div>
											<p className="text-xs text-gray-500 mb-3">
												{formatDate(order.createdAt)}
											</p>
											<div className="flex items-center gap-2 text-sm text-gray-600">
												<span>
													{order.items?.length || 0} item
													{order.items?.length !== 1 ? "s" : ""}
												</span>
												<ChevronRight className="w-3 h-3" />
												<span className="font-medium">
													{order.total_price?.toFixed(2)}€
												</span>
											</div>
										</div>
										<button
											onClick={() =>
												navigate(`/orders/${order._id}`)
											}
											className="mt-4 sm:mt-0 px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
										>
											View details
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Orders;