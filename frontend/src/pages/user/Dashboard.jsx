import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ShoppingBag, User, ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/authHooks";
import { ordersApi } from "../../api";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";

const statusColors = {
	Pending: "bg-yellow-100 text-yellow-800",
	Paid: "bg-blue-100 text-blue-800",
	Shipped: "bg-purple-100 text-purple-800",
	Delivered: "bg-green-100 text-green-800",
	Cancelled: "bg-red-100 text-red-800",
};

const UserDashboard = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [recentOrders, setRecentOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await ordersApi.getAll();
				setRecentOrders(response.data?.slice(0, 3) || []);
			} catch (err) {
				console.error(err);
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
			<div className="min-h-screen bg-white">
				<div className="max-w-5xl mx-auto px-4 py-8">
					<Skeleton className="h-8 w-48 mb-6" />
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{[...Array(3)].map((_, i) => (
							<Skeleton key={i} className="h-32" />
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-gray-50 border-b">
				<div className="max-w-5xl mx-auto px-4 py-8">
					<h1 className="text-2xl font-bold text-gray-900">
						Welcome, {user?.first_name}!
					</h1>
					<p className="text-gray-500 mt-1">Manage your account and orders</p>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<Link
						to="/profile"
						className="flex items-center gap-4 p-4 border rounded-lg hover:border-red-200 hover:bg-red-50/50 transition-colors"
					>
						<div className="p-3 bg-red-50 rounded-lg">
							<User className="w-5 h-5 text-red-700" />
						</div>
						<div>
							<h3 className="font-medium">My Profile</h3>
							<p className="text-sm text-gray-500">View and edit info</p>
						</div>
					</Link>

					<Link
						to="/orders"
						className="flex items-center gap-4 p-4 border rounded-lg hover:border-red-200 hover:bg-red-50/50 transition-colors"
					>
						<div className="p-3 bg-blue-50 rounded-lg">
							<Package className="w-5 h-5 text-blue-700" />
						</div>
						<div>
							<h3 className="font-medium">My Orders</h3>
							<p className="text-sm text-gray-500">Track your purchases</p>
						</div>
					</Link>

					<Link
						to="/products"
						className="flex items-center gap-4 p-4 border rounded-lg hover:border-red-200 hover:bg-red-50/50 transition-colors"
					>
						<div className="p-3 bg-green-50 rounded-lg">
							<ShoppingBag className="w-5 h-5 text-green-700" />
						</div>
						<div>
							<h3 className="font-medium">Continue Shopping</h3>
							<p className="text-sm text-gray-500">Browse catalog</p>
						</div>
					</Link>
				</div>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Recent Orders</CardTitle>
						<Link to="/orders">
							<Button variant="ghost" size="sm">
								View All <ArrowRight className="w-4 h-4 ml-1" />
							</Button>
						</Link>
					</CardHeader>
					<CardContent>
						{recentOrders.length === 0 ? (
							<div className="text-center py-8">
								<Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
								<h3 className="font-medium text-gray-900 mb-2">No orders yet</h3>
								<p className="text-gray-500 text-sm mb-4">
									When you place an order, it will appear here
								</p>
								<Link to="/products">
									<Button size="sm">Start Shopping</Button>
								</Link>
							</div>
						) : (
							<div className="space-y-4">
								{recentOrders.map((order) => (
									<Link
										key={order._id}
										to={`/orders/${order._id}`}
										className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
									>
										<div>
											<div className="flex items-center gap-3">
												<span className="font-medium">{order.order_code}</span>
												<span
													className={`px-2 py-0.5 text-xs font-medium rounded-full ${
														statusColors[order.status] || "bg-gray-100 text-gray-800"
													}`}
												>
													{order.status}
												</span>
											</div>
											<p className="text-sm text-gray-500 mt-1">
												{formatDate(order.createdAt)} · {order.items?.length || 0} items
											</p>
										</div>
										<div className="text-right">
											<p className="font-medium">€{order.total_price?.toFixed(2)}</p>
											<ArrowRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
										</div>
									</Link>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default UserDashboard;