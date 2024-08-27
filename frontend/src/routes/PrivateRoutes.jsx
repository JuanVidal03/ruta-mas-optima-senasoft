import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import Loader from "../components/loader/Loader";

import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = () => {

    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <Loader/>
    if (!isAuthenticated) return <Navigate to="/login" replace/>

    return <Outlet/>;
}

export default PrivateRoutes;
