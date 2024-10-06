import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './pages/Login/Login.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = '684255712035-fopai7v838k92cevfgla54o1634v89p5.apps.googleusercontent.com'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);




















