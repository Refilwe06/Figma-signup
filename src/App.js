import React from 'react';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<Login />} exact='true' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;