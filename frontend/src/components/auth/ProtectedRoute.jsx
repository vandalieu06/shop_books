import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authHooks";
import { Skeleton } from "../ui/skeleton";

const ProtectedRoute = ({ children, requiredRole = null }) => {
	const { isAuthenticated, user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Skeleton className="w-32 h-8" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	if (requiredRole === "admin" && user?.role !== "admin") {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;