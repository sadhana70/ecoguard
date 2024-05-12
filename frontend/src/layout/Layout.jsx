import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {

  return (
    <>
      <div className='bg-white min-h-screen z=1'>

        <Sidebar />
        <div className='pl-80'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
