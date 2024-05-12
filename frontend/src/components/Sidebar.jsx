import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsAppIndicator, BsHouseDoorFill } from "react-icons/bs";
import {
  AiFillCamera,
  AiOutlineCloseCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";
import { IoMdFlag } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { BiMenu } from "react-icons/bi";
import { AiFillAudio } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";


import "C:/Users/14028/demo/ecoguard/frontend/src/color.css";



const Sidebar = () => {
  const { pathname } = useLocation();
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  const toggleSidebar = () => {
    setSidebarHidden(isLargeScreen ? false : !sidebarHidden);
  };

  const activeLinkStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "var(--main-green)" : "white",
      color: isActive ? "white" : "var(--main-green)",
    };
  };

  return (
    <>
      {sidebarHidden && (
        <div className="menu-icon">
          <BiMenu
            className="cursor-pointer md:hidden m-3 text-2xl"
            onClick={toggleSidebar}
          />
        </div>
      )}
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white
        -900 border-r-4 border-pink${isLargeScreen || !sidebarHidden ? "" : "hidden"}`}
      >

        {!sidebarHidden && (
          <div className="w-full text-white text-2xl flex justify-end">
            <AiOutlineCloseCircle
              className="cursor-pointer md:hidden m-2"
              onClick={toggleSidebar}
            />
          </div>
        )}
        <div className="text-black-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <BsAppIndicator className="px-2 py-1 rounded-md bg-[#01d28e] "/>
            <h1 className="font-bold text-black-200 text-[30px] ml-3">

              Ecoguard
            </h1>
            {sidebarHidden ? (
              <i
                className='bi bi-list cursor-pointer ml-28 lg:hidden'
                onClick={toggleSidebar}
              ></i>
            ) : (
              <i
                className='bi bi-x cursor-pointer ml-28 lg:hidden'
                onClick={toggleSidebar}
              ></i>
            )}
          </div>
          <div className='my-2 bg-gray-600 h-[1px]'></div>
        </div>
        {pathname !== "/user" ? (
          <NavLink
            to='/protected'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <BsHouseDoorFill />
            <span className='text-[20px] ml-4 text-gray-900 font-bold'>
              Home
            </span>
          </NavLink>
        ) : null}
        {pathname !== "/user" ? (
          <NavLink
            to='/protected/cameras'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <AiFillCamera />
            <span className='text-[20px] ml-4 text-gray-900 font-bold'>
              Cameras
            </span>
          </NavLink>
        ) : null}
        {pathname !== "/user" ? (
          <NavLink
            to='/protected/suspects'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <AiOutlineUser />
            <span className='text-[20px] ml-4 text-gray-900 font-bold'>
              Suspects
            </span>
          </NavLink>
        ) : null}
        {pathname === "/user" ? (
          <NavLink
            style={activeLinkStyle}
            to='/user'
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <IoMdFlag />
            <span className='text-[20px] ml-4 text-gray-900 font-bold'>
              Report
            </span>
          </NavLink>
        ) : null}
        {pathname !== "/user" ? (
          <NavLink
            to='/protected/graph'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <FaChartBar className='' />
            <span className='text-[20px] ml-4 text-gray-900 font-bold'>
              Graph
            </span>
          </NavLink>
        ) : null}
        {pathname !== "/user" ? (
          <NavLink
            to='/protected/audio'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <AiFillAudio />
            <span className='text-[20px] ml-4 text-black font-bold'>
              Audio
            </span>
          </NavLink>
        ) : null}
        {/* {pathname !== "/user" ? (
          <NavLink
            to='/protected/alert'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <FaChartBar className='' />
            <span className='text-[20px] ml-4 text-gray-900 font-bold'>
              Graph
            </span>
          </NavLink>
        ) : null} */}
        {/* {pathname !== "/user" ? (
          <NavLink
            to='/protected/audio'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <AiFillAudio />
            <span className='text-[20px] ml-4 text-black font-bold'>
              Audio
            </span>
          </NavLink>
        ) : null} */}
        {pathname !== "/user" ? (
          <NavLink
            to='/protected/alert'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#01d28e] text-white'
          >
            <IoIosNotifications />

            <span className='text-[20px] ml-4 text-black font-bold'>
              Alert
            </span>
          </NavLink>
        ) : null}
        {/* {pathname !== "/user" ? (
          <NavLink
            to='/protected/audio'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
          >
            <FaChartBar className='' />
            <span className='text-[20px] ml-4 text-gray-200 font-bold'>
              Audio
            </span>
          </NavLink>
        ) : null} */}
        {/* {pathname !== "/user" ? (
          <NavLink
            to='/protected/alert'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
          >
            <FaChartBar className='' />
            <span className='text-[20px] ml-4 text-gray-200 font-bold'>
              Alert
            </span>
          </NavLink>
        ) : null} */}


      </div>
    </>
  );
};

export default Sidebar;
