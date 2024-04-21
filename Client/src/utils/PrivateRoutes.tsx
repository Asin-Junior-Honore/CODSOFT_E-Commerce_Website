import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoutes = () => {
    const [cookies] = useCookies(['token']);
    const isAuthenticated = !!cookies.token; // Check if token exists in cookies

    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If user is authenticated, render the private routes
    return (

        <Outlet />

    );
};

export default PrivateRoutes;
