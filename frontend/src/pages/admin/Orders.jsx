import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { adminApi } from "../../api";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";

const AdminOrders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const response = await adminApi.getAllOrders({ page, limit: 20 });
				setOrders(response.data || []);
				setPagination(response.pagination);
			} catch (err) {
				setError(err.message || "Error loading orders");
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, [page]);

	const statusColors = {
		Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
		Paid: "bg-blue-100 text-blue-800 hover:bg-blue-100",
		Shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
		Delivered: "bg-green-100 text-green-800 hover:bg-green-100",
		Cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("es-ES", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="p-6 space-y-4">
				<Skeleton className="h-8 w-32" />
				<Skeleton className="h-64" />
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

	return (
		<div className="p-6 space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">Orders</h1>
				<p className="text-gray-500 mt-1">Manage all orders in the system</p>
			</div>

			<Card>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Items</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-8 text-gray-500">
										No orders found
									</TableCell>
								</TableRow>
							) : (
								orders.map((order) => (
									<TableRow key={order._id}>
										<TableCell className="font-medium">
											{order.order_code}
										</TableCell>
										<TableCell>
											<div className="text-sm">
												<div>{order.user?.first_name} {order.user?.last_name}</div>
												<div className="text-gray-500">{order.user?.email}</div>
											</div>
										</TableCell>
										<TableCell>{formatDate(order.createdAt)}</TableCell>
										<TableCell>{order.items?.length || 0}</TableCell>
										<TableCell>€{order.total_price?.toFixed(2)}</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className={statusColors[order.status]}
											>
												{order.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<Link to={`/admin/orders/${order._id}`}>
												<Button variant="ghost" size="sm">
													View
												</Button>
											</Link>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{pagination && pagination.totalPages > 1 && (
				<div className="flex justify-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage(p => p - 1)}
						disabled={page === 1}
					>
						Previous
					</Button>
					<span className="px-4 py-2 text-sm text-gray-600">
						Page {pagination.page} of {pagination.totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage(p => p + 1)}
						disabled={page >= pagination.totalPages}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default AdminOrders;