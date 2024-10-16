import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = () => {
    const { setUser } = useContext(UserContext);
    const params = new URLSearchParams(window.location.search);
    const token = Cookies.get('token') || params.get('token');

    useEffect(() => {
        if (!token) {
            localStorage.removeItem('user');
            setUser(null); // Update the user state only if the token is absent
        }
    }, [token, setUser]); // Run effect when token changes

    if (!token) {
        return <Navigate to='/login' />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
