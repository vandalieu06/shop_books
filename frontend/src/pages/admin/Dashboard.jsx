import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, ShoppingCart, TrendingUp, Package, ArrowRight } from "lucide-react";
import { adminApi } from "../../api";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

const StatCard = ({ title, value, icon: Icon, description }) => (
	<Card>
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
			<Icon className="w-4 h-4 text-gray-400" />
		</CardHeader>
		<CardContent>
			<div className="text-2xl font-bold">{value}</div>
			{description && (
				<p className="text-xs text-gray-400 mt-1">{description}</p>
			)}
		</CardContent>
	</Card>
);

const AdminDashboard = () => {
	const [metrics, setMetrics] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMetrics = async () => {
			try {
				const response = await adminApi.getMetrics();
				setMetrics(response.data);
			} catch (err) {
				setError(err.message || "Error loading metrics");
			} finally {
				setLoading(false);
			}
		};
		fetchMetrics();
	}, []);

	if (loading) {
		return (
			<div className="p-6 space-y-6">
				<Skeleton className="h-8 w-48" />
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{[...Array(4)].map((_, i) => (
						<Skeleton key={i} className="h-32" />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6">
				<div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
			</div>
		);
	}

	const stats = [
		{
			title: "Total Users",
			value: metrics?.usersCount || 0,
			icon: Users,
			description: "Registered users",
		},
		{
			title: "Total Orders",
			value: metrics?.ordersCount || 0,
			icon: ShoppingCart,
			description: "All time orders",
		},
		{
			title: "Revenue",
			value: `€${(metrics?.revenue || 0).toFixed(2)}`,
			icon: TrendingUp,
			description: "Total revenue",
		},
		{
			title: "Pending Orders",
			value: metrics?.ordersByStatus?.Pending || 0,
			icon: Package,
			description: "Awaiting processing",
		},
	];

	const statusColors = {
		Pending: "bg-yellow-100 text-yellow-800",
		Paid: "bg-blue-100 text-blue-800",
		Shipped: "bg-purple-100 text-purple-800",
		Delivered: "bg-green-100 text-green-800",
		Cancelled: "bg-red-100 text-red-800",
	};

	return (
		<div className="p-6 space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-gray-500 mt-1">Overview of your store</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<StatCard key={stat.title} {...stat} />
				))}
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Orders by Status</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-3">
						{Object.entries(metrics?.ordersByStatus || {}).map(([status, count]) => (
							<span
								key={status}
								className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
							>
								{status}: {count}
							</span>
						))}
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Link
					to="/admin/users"
					className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
				>
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-50 rounded-lg">
							<Users className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<h3 className="font-medium">Manage Users</h3>
							<p className="text-sm text-gray-500">View and edit user accounts</p>
						</div>
					</div>
					<ArrowRight className="w-4 h-4 text-gray-400" />
				</Link>

				<Link
					to="/admin/orders"
					className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
				>
					<div className="flex items-center gap-3">
						<div className="p-2 bg-green-50 rounded-lg">
							<Package className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<h3 className="font-medium">Manage Orders</h3>
							<p className="text-sm text-gray-500">View and update orders</p>
						</div>
					</div>
					<ArrowRight className="w-4 h-4 text-gray-400" />
				</Link>
			</div>
		</div>
	);
};

export default AdminDashboard;