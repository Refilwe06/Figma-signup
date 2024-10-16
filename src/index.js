import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { UserProvider } from './context/UserContext';
import { LoaderProvider } from './context/LoaderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoaderProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </LoaderProvider>
);