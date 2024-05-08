/*import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import CameraPage from "./pages/CameraPage";
import SuspectPage from "./pages/SuspectPage";
import GraphPage from "./pages/GraphPage";
import UserPage from "./pages/UserPage";

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/protected');
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <Routes>

      <Route path='/' element={<Layout />} >
        <Route index element={<HomePage />} />

        <Route path='/cameras' element={<CameraPage />} />
        <Route path='/suspects' element={<SuspectPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/graph' element={<GraphPage />} />
      </Route>
    </Routes>

  );
}

export default ProtectedPage;*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import CameraPage from "./pages/CameraPage";
import SuspectPage from "./pages/SuspectPage";
import GraphPage from "./pages/GraphPage";
import UserPage from "./pages/UserPage";
import Login from "./Login.jsx"; // Import your login page component

function ProtectedPage() {
  const navigate = useNavigate();
  const [tokenValidated, setTokenValidated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        setTokenValidated(true);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to login page if token is invalid
      }
    };

    verifyToken();
  }, [navigate]);

  // Render the protected routes only if the token has been validated
  return tokenValidated ? (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path='/cameras' element={<CameraPage />} />
        <Route path='/suspects' element={<SuspectPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/graph' element={<GraphPage />} />
      </Route>
    </Routes>
  ) : null;
}

export default ProtectedPage;

