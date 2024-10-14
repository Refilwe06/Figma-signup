import React, { useContext, useEffect, useCallback } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Cookies from 'js-cookie';

const Profile = () => {
    const { user, setUser } = useContext(UserContext); // Access user data from context
    const navigate = useNavigate();
    const token = Cookies.get('token');

    // Memoize getUser using useCallback
    const getUser = useCallback(async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;

            const response = await axios.get(url, {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            console.log(response?.data?.user);
            setUser(response?.data?.user);
        } catch (err) {
            console.log(err?.data);
            alert(err?.response?.data?.msg); // Set the error message state
            navigate('/login');
            console.error(err);
        }
    }, [setUser, navigate]); // Add setUser and navigate to the dependency array

    // useEffect to fetch user data only if token exists and user is not already set
    useEffect(() => {
        if (!user && token) getUser();
    }, [token, user, getUser]); // Ensure getUser and token are dependencies

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`);

            setUser(null); // Clear user data in context
            localStorage.removeItem('user'); // Clear localStorage user
            navigate('/login'); // Redirect to login page
        } catch (err) {
            console.error('Logout failed', err);
            alert('Logout failed, please try again.');
        }
    };

    return (
        <div className="profile-card">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>Date Joined:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Profile;
