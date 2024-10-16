import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useLoader } from '../../context/LoaderContext';

function Register() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        // If the user is already logged in, redirect to the profile page
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState(null);

    // Handle input changes for all form fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;
        // Input Validations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d).{8,}$/;

        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long, and include at least one number.');
            return;
        }
        try {
            showLoader();
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUser(response.data?.user);
            // Store token in localStorage instead of cookies
            localStorage.setItem('jwtToken', response.data?.token);
            // Clear form after successful registration
            setFormData({ name: '', email: '', password: '', rememberMe: false });
            setError(null);

            alert(response.data?.msg);
            localStorage.setItem('user', JSON.stringify(response.data?.user));
            navigate('../profile');
        } catch (err) {
            const errorMessage = err?.response?.data?.err || 'An error occurred';
            console.error('Error registering user:', errorMessage);
            setError(errorMessage);
        } finally {
            hideLoader();
        }
    };

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, '_self');
    }

    return (
        <main>
            <div className="container">
                <div className="left-content">
                    <div className="header">
                        <div className="logo">
                            <img src={process.env.PUBLIC_URL + '/Logo.png'} alt="Logo" />
                        </div>
                    </div>

                    <div className="wrapper">
                        <div className="sign-up-text">
                            <h1 className="bebas-neue-regular">
                                SIGN UP
                            </h1>
                            <p>Create an account to get started</p>
                        </div>

                        <div className="login-details">
                            <div className="google-button-wrapper">
                                <img onClick={googleAuth} src={process.env.PUBLIC_URL + '/GoogleButton.svg'} alt='Google Login Button' />
                            </div>

                            <div className="separator">
                                <div className='line'></div>
                                <p>Or</p>
                                <div className='line'></div>
                            </div>
                            {error && <p className="error">{error}</p>}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="remember-me">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                    />
                                    <label>
                                        Remember me
                                    </label>
                                </div>
                                <button className="register-button" type="submit">Register</button>
                                <p>Already have an account? <Link to="/login">Log in</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="right-content">
                    <div className="speaker-container"></div>
                </div>
            </div>
        </main>
    );
}

export default Register;
