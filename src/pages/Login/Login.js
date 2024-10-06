import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css'; // Import your CSS file for styling

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend for registration
      const response = await axios.post('http://localhost:5000/register', formData);
      
      // Handle successful registration
      console.log('Registration successful', response.data);

      // Clear form data and error
      setFormData({ name: '', email: '', password: '' });
      setError(null);
      
      // Optionally redirect the user or show a success message
      alert('Registration successful! You can now log in.');
    } catch (err) {
      // Handle errors during registration
      const errorMessage = err.response?.data?.err || 'An error occurred';
      console.error('Error registering user:', errorMessage);
      setError(errorMessage);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    console.log('Google token:', token);

    try {
      const res = await axios.post('https://signup-backend-intf.onrender.com/auth/google', { token });
      console.log('Google authentication successful:', res.data);
      // Handle successful Google authentication
    } catch (err) {
      // Handle errors during Google authentication
      const errorMessage = err.response?.data?.message || 'An error occurred';
      console.error('Error during Google authentication:', errorMessage);
      setError(errorMessage);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="container">
      <div className='Left-content'>
        <div className="header">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + '/Logo.png'} alt="Logo" />
          </div>
        </div>
        <div className="heading">
          <img src={process.env.PUBLIC_URL + '/Heading.png'} alt="Heading" />
        </div>
        
        <div className="login-details">
          <br /><br />
          <div className="google-button-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              render={(renderProps) => (
                <img
                  src={process.env.PUBLIC_URL + '/Glogin.png'}
                  alt="Google Sign-In"
                  className="google-button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                />
              )}
            />
          </div>
          <br /><br />
          <img src={process.env.PUBLIC_URL + '/Seperater.png'} alt="Separator" className="separator" />
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
            <div className="form-group">
              <label>
                <input type="checkbox" id="remember-me" />
                Remember me
              </label>
            </div>
            <button className="register-button" type="submit">Register</button>
            {error && <p className="error">{error}</p>}
            <p>Already have an account? <span>Log in</span></p>
          </form>
        </div>
      </div>
      <div className='Right-content'></div>
    </div>
  );
}

export default Login;

