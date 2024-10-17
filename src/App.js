import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import ProtectedRoutes from './utilities/ProtectedRoutes';
import Loader from './components/Loader/Loader';

function App() {

  return (
    <BrowserRouter>
      <Loader />
      <Routes>
        <Route path='/' element={<Register />} exact='true' />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* ProtectedRoutes will ensure that JWT is required to access the profile */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
