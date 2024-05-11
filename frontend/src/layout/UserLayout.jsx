import React from "react";
import { Outlet } from "react-router-dom";
import UserSideBar from "../components/UserSidebar";
import CameraComponent from "../components/CameraAccess";

function UserLayout() {
  return (
    <div className='  bg-gray-800 min-h-screen'>
      <UserSideBar />
      <div className='pl-80'>
        <Outlet />
      </div>
    </div >
  );
}

export default UserLayout;
