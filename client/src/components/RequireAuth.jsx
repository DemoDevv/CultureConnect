import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

/**
 * Component to require authentication
 * if the user is not authenticated, it will redirect to the login page
 * @typedef RequireAuthProps
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function RequireAuth({ children }) {
	const { token } = useAuth();
	const { location } = useLocation();

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
