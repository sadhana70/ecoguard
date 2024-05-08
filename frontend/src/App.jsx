/*import React from "react";
import Sidebar from "./components/Sidebar";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import CameraPage from "./pages/CameraPage";
import SuspectPage from "./pages/SuspectPage";
import UserLayout from "./layout/UserLayout";
import GraphPage from "./pages/GraphPage";
import UserPage from "./pages/UserPage";
function App() {
  return (
    function App() {
      const router = createBrowserRouter(
        createRoutesFromElements(

          <Route
            path='/'
            element={<Layout />}
          >

            <Route
              index
              element={<HomePage />}
            />
            <Route
              path='/cameras'
              element={<CameraPage />}
            />
            <Route
              path='/suspects'
              element={<SuspectPage />}
            />
            <Route
              path='/user'
              element={<UserPage />}
            />
            <Route
              path='/graph'
              element={<GraphPage />}
            />
          </Route>
        )
      );
      return <RouterProvider router={router} />;
    }
  )
};*/import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProtectedPage from './Protected';

function App() {

  return (
    <Home />

    /*<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/protected" element={<ProtectedPage />} /> }
  </Routes></Router>*/


  );
}

export default App;


