import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../../api";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Skeleton } from "../../components/ui/skeleton";

const statusOptions = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];

const statusColors = {
	Pending: "bg-yellow-100 text-yellow-800",
	Paid: "bg-blue-100 text-blue-800",
	Shipped: "bg-purple-100 text-purple-800",
	Delivered: "bg-green-100 text-green-800",
	Cancelled: "bg-red-100 text-red-800",
};

const AdminOrderDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const response = await adminApi.getAllOrders();
				const foundOrder = response.data?.find(o => o._id === id);
				setOrder(foundOrder || null);
				if (!foundOrder) {
					setError("Order not found");
				}
			} catch (err) {
				setError(err.message || "Error loading order");
			} finally {
				setLoading(false);
			}
		};
		fetchOrder();
	}, [id]);

	const handleStatusChange = async (newStatus) => {
		setUpdating(true);
		try {
			await adminApi.updateOrderStatus(id, newStatus);
			setOrder(prev => ({ ...prev, status: newStatus }));
		} catch (err) {
			alert(err.message || "Error updating status");
		} finally {
			setUpdating(false);
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

	if (loading) {
		return (
			<div className="p-6 space-y-4">
				<Skeleton className="h-8 w-32" />
				<Skeleton className="h-64" />
			</div>
		);
	}

	if (error || !order) {
		return (
			<div className="p-6">
				<div className="p-4 bg-red-50 text-red-700 rounded-lg">
					{error || "Order not found"}
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<div>
				<Button
					variant="ghost"
					onClick={() => navigate("/admin/orders")}
					className="mb-4"
				>
					← Back to orders
				</Button>
				<h1 className="text-2xl font-bold text-gray-900">
					Order {order.order_code}
				</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Order Items</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<table className="w-full">
								<thead className="border-b">
									<tr>
										<th className="text-left p-4 text-sm font-medium text-gray-500">Product</th>
										<th className="text-right p-4 text-sm font-medium text-gray-500">Qty</th>
										<th className="text-right p-4 text-sm font-medium text-gray-500">Price</th>
										<th className="text-right p-4 text-sm font-medium text-gray-500">Subtotal</th>
									</tr>
								</thead>
								<tbody className="divide-y">
									{order.items?.map((item, index) => (
										<tr key={index}>
											<td className="p-4">
												<div className="font-medium">{item.title}</div>
											</td>
											<td className="p-4 text-right">{item.quantity}</td>
											<td className="p-4 text-right">€{item.price?.toFixed(2)}</td>
											<td className="p-4 text-right font-medium">
												€{(item.price * item.quantity).toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</CardContent>
					</Card>

					{order.shippingAddress && (
						<Card>
							<CardHeader>
								<CardTitle>Shipping Address</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{order.shippingAddress.street}</p>
								<p>{order.shippingAddress.zipcode}, {order.shippingAddress.city}</p>
								<p>{order.shippingAddress.country}</p>
							</CardContent>
						</Card>
					)}
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Order Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500">Current Status</span>
								<Badge className={statusColors[order.status]}>
									{order.status}
								</Badge>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Change Status</label>
								<Select
									value={order.status}
									onValueChange={handleStatusChange}
									disabled={updating}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										{statusOptions.map((status) => (
											<SelectItem key={status} value={status}>
												{status}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Customer</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-sm">
								<p className="font-medium">
									{order.user?.first_name} {order.user?.last_name}
								</p>
								<p className="text-gray-500">{order.user?.email}</p>
								<p className="text-gray-500">@{order.user?.username}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-gray-500">Total</span>
									<span className="font-bold">€{order.total_price?.toFixed(2)}</span>
								</div>
								<div className="text-gray-400 pt-2 border-t">
									{formatDate(order.createdAt)}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AdminOrderDetail;