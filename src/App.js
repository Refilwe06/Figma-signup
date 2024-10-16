import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProtectedRoutes from './utilities/ProtectedRoutes';
import Loader from './components/Loader/Loader';
import { UserContext } from './context/UserContext';

function App() {
  const [errorMessage, setErrorMessage] = useState(null); // State to hold error messages
  const { setUser } = useContext(UserContext);
  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;

      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      Cookies.set('token', response?.data?.token);
      console.log(response?.data?.msg);
      setUser(response?.data?.user);
    } catch (err) {
      console.log(err?.data);
      setErrorMessage(err?.response?.data?.msg); // Set the error message state
      console.error(err);
    }
  };

  useEffect(() => {
    if (!Cookies.get('token')) getUser();
  }, []);

  useEffect(() => {
    const hasShownAlert = localStorage.getItem('hasShownAlert'); // Check if alert has been shown

    if (errorMessage && !hasShownAlert) {
      alert(errorMessage); // Show the alert if there's an error message and alert hasn't been shown
      localStorage.setItem('hasShownAlert', 'true'); // Set the flag to prevent showing the alert again
    }
  }, [errorMessage]); // Run this effect only when errorMessage changes

  return (
    <BrowserRouter>
      <Loader />
      <Routes>
        <Route path='/' element={<Register />} exact='true' />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
