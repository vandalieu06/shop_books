import { useState, useEffect } from "react";
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
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";

const AdminUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState(null);
	const [page, setPage] = useState(1);
	const [editingUser, setEditingUser] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const response = await adminApi.getAllUsers({ page, limit: 20 });
				setUsers(response.data || []);
				setPagination(response.pagination);
			} catch (err) {
				setError(err.message || "Error loading users");
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, [page]);

	const handleUpdateUser = async (userId, data) => {
		try {
			await adminApi.updateUser(userId, data);
			setUsers(prev =>
				prev.map(u => (u._id === userId ? { ...u, ...data } : u))
			);
			setEditingUser(null);
		} catch (err) {
			alert(err.message || "Error updating user");
		}
	};

	const handleDeleteUser = async (userId) => {
		if (!confirm("Are you sure you want to delete this user?")) return;
		try {
			await adminApi.deleteUser(userId);
			setUsers(prev => prev.filter(u => u._id !== userId));
		} catch (err) {
			alert(err.message || "Error deleting user");
		}
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
				<h1 className="text-2xl font-bold text-gray-900">Users</h1>
				<p className="text-gray-500 mt-1">Manage all users in the system</p>
			</div>

			<Card>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Username</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Joined</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-8 text-gray-500">
										No users found
									</TableCell>
								</TableRow>
							) : (
								users.map((user) => (
									<TableRow key={user._id}>
										<TableCell className="font-medium">
											{user.first_name} {user.last_name}
										</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>@{user.username}</TableCell>
										<TableCell>
											<Badge
												variant={user.role === "admin" ? "default" : "secondary"}
											>
												{user.role}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge
												variant={user.isActive ? "default" : "destructive"}
											>
												{user.isActive ? "Active" : "Inactive"}
											</Badge>
										</TableCell>
										<TableCell>{formatDate(user.createdAt)}</TableCell>
										<TableCell className="text-right">
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => setEditingUser(user)}
													>
														Edit
													</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>Edit User</DialogTitle>
														<DialogDescription>
															Edit details for {user.first_name} {user.last_name}
														</DialogDescription>
													</DialogHeader>
													<div className="space-y-4 py-4">
														<div className="space-y-2">
															<label className="text-sm font-medium">Role</label>
															<Select
																value={editingUser?.role}
																onValueChange={(value) =>
																	setEditingUser({ ...editingUser, role: value })
																}
															>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="user">User</SelectItem>
																	<SelectItem value="admin">Admin</SelectItem>
																</SelectContent>
															</Select>
														</div>
														<div className="space-y-2">
															<label className="text-sm font-medium">Status</label>
															<Select
																value={editingUser?.isActive ? "true" : "false"}
																onValueChange={(value) =>
																	setEditingUser({
																				...editingUser,
																				isActive: value === "true",
																			})
																}
															>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="true">Active</SelectItem>
																	<SelectItem value="false">Inactive</SelectItem>
																</SelectContent>
															</Select>
														</div>
													</div>
													<DialogFooter>
														<Button
															variant="outline"
															onClick={() => setEditingUser(null)}
														>
															Cancel
														</Button>
														<Button
															onClick={() =>
																handleUpdateUser(user._id, {
																	role: editingUser.role,
																	isActive: editingUser.isActive,
																})
															}
														>
															Save Changes
														</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>
											<Button
												variant="ghost"
												size="sm"
												className="text-red-600 hover:text-red-700"
												onClick={() => handleDeleteUser(user._id)}
											>
												Delete
											</Button>
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

export default AdminUsers;