import { Navigate } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";

import Loading from "../../pages/Loading/Loading";

const ProtectedRoute = ({ children }) => {

    const {
        isAuthenticated,
        loading
    } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return isAuthenticated
        ? children
        : <Navigate to="/" replace />;
};

export default ProtectedRoute;