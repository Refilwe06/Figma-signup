import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;

      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log(response?.data?.msg);
      setUser(response?.data);
    } catch (err) {
      alert(err?.data?.msg);
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} exact='true' />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;