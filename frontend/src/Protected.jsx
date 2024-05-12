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
import AudioPage from "./pages/AudioPage";
import AlertPage from "./pages/AlertPage";




// import AudioPage from "./pages/AudioPage";
// import AlertPage from "./pages/AlertPage";




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
  return tokenValidated ? (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path='/cameras' element={<CameraPage />} />
        <Route path='/suspects' className="z=1" element={<SuspectPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/graph' element={<GraphPage />} />
        <Route path='/audio' element={<AudioPage />} />
        <Route path='/alert' element={<AlertPage />} />


        {/* <Route path='/notification' element={<GraphPage />} /> */}

      </Route>
    </Routes>
  ) : null;
}

export default ProtectedPage;