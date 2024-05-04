import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {

  return (
    <>
      <div className='  bg-gray-800 min-h-screen'>
        <Sidebar />
        <div className='pl-80'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
