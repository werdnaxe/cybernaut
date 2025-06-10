import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';

// Only allow access to certain routes if user is logged in and has token
const PrivateRoute = () => {
    const user = useAuthContext();
    if (!user.token) return <Navigate to='/user-forms' />;
    return <Outlet />;
}

export default PrivateRoute;
