import { useAuth } from "../contexts/authHooks";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const useRequireAuth = (requiredRole = null) => {
	const { isAuthenticated, user, loading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (loading) return;

		if (!isAuthenticated) {
			navigate("/login", { state: { from: location.pathname } });
			return;
		}

		if (requiredRole && user?.role !== requiredRole) {
			navigate("/", { replace: true });
		}
	}, [isAuthenticated, user, loading, navigate, location, requiredRole]);

	return { isAuthenticated, user, loading };
};

export default useRequireAuth;