/*import React from "react";
import Sidebar from "./components/Sidebar";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/home.jsx";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import CameraPage from "./pages/CameraPage";
import SuspectPage from "./pages/SuspectPage";
import UserLayout from "./layout/UserLayout";
import GraphPage from "./pages/GraphPage";
import UserPage from "./pages/UserPage";
function Home2() {
    return (
        function Home2() {
            const router = createBrowserRouter(
                createRoutesFromElements(

                    <Route
                        path='/'
                        element={<Layout />}
                    >

                        <Route
                            path='/main'
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
}

export default Home2;*/