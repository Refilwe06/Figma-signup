import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

function App() {
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