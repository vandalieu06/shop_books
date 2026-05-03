import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
	LayoutDashboard,
	Users,
	Package,
	Menu,
	X,
	LogOut,
	BookOpen,
} from "lucide-react";
import { useAuth } from "../contexts/authHooks";
import { Button } from "../components/ui/button";

const navItems = [
	{ label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
	{ label: "Orders", icon: Package, path: "/admin/orders" },
	{ label: "Users", icon: Users, path: "/admin/users" },
];

const AdminLayout = () => {
	const location = useLocation();
	const { logout, user } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex min-h-screen bg-gray-100">
			<aside
				className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0`}
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between h-16 px-4 border-b">
						<Link to="/admin" className="flex items-center gap-2">
							<div className="bg-red-700 p-1">
								<BookOpen className="w-4 h-4 text-white" />
							</div>
							<span className="font-semibold">Admin Panel</span>
						</Link>
						<button
							className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
							onClick={() => setSidebarOpen(false)}
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<nav className="flex-1 p-4 space-y-1">
						{navItems.map((item) => {
							const isActive =
								item.path === "/admin"
									? location.pathname === "/admin"
									: location.pathname.startsWith(item.path);

							return (
								<Link
									key={item.path}
									to={item.path}
									onClick={() => setSidebarOpen(false)}
									className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
										isActive
											? "bg-red-50 text-red-700"
											: "text-gray-600 hover:bg-gray-50"
									}`}
								>
									<item.icon className="w-4 h-4" />
									{item.label}
								</Link>
							);
						})}
					</nav>

					<div className="p-4 border-t">
						<div className="mb-2 px-3">
							<p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
							<p className="text-xs text-gray-500">{user?.email}</p>
						</div>
						<Link
							to="/"
							className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
						>
							<BookOpen className="w-4 h-4" />
							View Store
						</Link>
						<button
							onClick={logout}
							className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
						>
							<LogOut className="w-4 h-4" />
							Logout
						</button>
					</div>
				</div>
			</aside>

			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			<div className="flex-1 lg:ml-64">
				<header className="sticky top-0 z-30 bg-white border-b lg:hidden">
					<div className="flex items-center h-16 px-4">
						<button
							className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
							onClick={() => setSidebarOpen(true)}
						>
							<Menu className="w-5 h-5" />
						</button>
						<span className="ml-4 font-semibold">Admin Panel</span>
					</div>
				</header>

				<main className="min-h-[calc(100vh-4rem)] lg:min-h-screen">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;