import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';

const PrivateRoute = () => {
    const user = useAuthContext();
    if (!user.token) return <Navigate to='/user-forms' />;
    return <Outlet />;
}

export default PrivateRoute;
