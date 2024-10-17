/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useCallback, useMemo } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Logout from '../../components/Logout/Logout';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import { useLoader } from '../../context/LoaderContext';

const Profile = () => {
    const { user, setUser } = useContext(UserContext); // Access user data from context
    const navigate = useNavigate();
    const params = useMemo(() => new URLSearchParams(window.location.search), []);

    const { showLoader, hideLoader } = useLoader();

    // Check for token in URL parameters or localStorage
    const token = params.get('token') || localStorage.getItem('jwtToken');

    // Function to set the token and store it locally
    const setToken = useCallback((token) => {
        localStorage.setItem('jwtToken', token); // Store token in localStorage
    }, []);

    const handleLogout = async () => {
        setUser(null); // Clear user data in context
        localStorage.removeItem('jwtToken'); // Clear JWT from localStorage
        localStorage.removeItem('user'); // Clear JWT from localStorage
        navigate('/login'); // Redirect to login page
    };


    // Fetch user data from the server using the token
    const getUser = useCallback(async () => {
        try {
            if (!token) {
                // If no token, redirect to login
                navigate('/login');
                return;
            }

            const url = `${process.env.REACT_APP_API_URL}/auth/get-user`;
            showLoader();

            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}` // Send token in Authorization header
                }
            });

            if (!response?.data?.user) throw new Error('Error fetching user data')
            console.log(response?.data?.user);
            setUser(response?.data?.user);
            navigate('../profile'); // Redirect to login on error

        } catch (err) {
            console.error(err);
            localStorage.removeItem('jwtToken'); // Clear JWT from localStorage
            alert(err?.response?.data?.err || 'Error fetching user data'); // Show error message
            handleLogout();
        } finally {
            hideLoader();
        }
    }, [token, setUser, navigate, showLoader, hideLoader]);

    // useEffect to fetch user data only if token exists and user is not already set
    useEffect(() => {
        if (!user && token) {
            // If the token comes from URL params, store it in localStorage
            if (params.get('token')) {
                setToken(params.get('token'));
            }
            getUser();
        }
    }, [token, user, getUser, setToken, params]);

    return (
        <div className="profile-card">
            <ProfileInfo user={user} />
            <Logout handleLogout={handleLogout} />
        </div>
    );
};

export default Profile;
