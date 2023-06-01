import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelectors } from "../../seastorm/store/auth.slice";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(authSelectors.isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/sea_storm_atlas/" replace />;
    }

    return children;
};

export default ProtectedRoute;
