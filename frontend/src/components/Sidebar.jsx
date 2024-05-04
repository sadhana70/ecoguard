import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {BsAppIndicator, BsHouseDoorFill} from "react-icons/bs";
import {
  AiFillCamera,
  AiOutlineCloseCircle,
  AiOutlineUser,
} from "react-icons/ai";
import {FaChartBar} from "react-icons/fa";
import {IoMdFlag} from "react-icons/io";
import {useMediaQuery} from "react-responsive";
import {BiMenu} from "react-icons/bi";



const Sidebar = () => {
  const { pathname } = useLocation();
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const isLargeScreen = useMediaQuery({minWidth: 768});
  const toggleSidebar = () => {
    setSidebarHidden(isLargeScreen ? false : !sidebarHidden);
  };

  const activeLinkStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#3490dc" : "",
      color: isActive ? "#ffffff" : "",
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
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${
          isLargeScreen || !sidebarHidden ? "" : "hidden"
        }`}
      >

        {!sidebarHidden && (
          <div className="w-full text-white text-2xl flex justify-end">
            <AiOutlineCloseCircle
              className="cursor-pointer md:hidden m-2"
              onClick={toggleSidebar}
            />
          </div>
        )}
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <BsAppIndicator className="px-2 py-1 rounded-md bg-blue-600" />
            <h1 className="font-bold text-gray-200 text-[30px] ml-3">

              BalenAI
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
            to='/'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
          >
            <BsHouseDoorFill />
            <span className='text-[20px] ml-4 text-gray-200 font-bold'>
              Home
            </span>
          </NavLink>
        ) : null}
        {pathname !== "/user" ? (
          <NavLink
            to='/cameras'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
          >
            <AiFillCamera />
            <span className='text-[20px] ml-4 text-gray-200 font-bold'>
              Cameras
            </span>
          </NavLink>
        ) : null}
        {pathname !== "/user" ? (
          <NavLink
            to='/suspects'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
          >
            <AiOutlineUser />
            <span className='text-[20px] ml-4 text-gray-200 font-bold'>
              Suspects
            </span>
          </NavLink>
        ) : null}
        {pathname === "/user" ? (
          <NavLink
            style={activeLinkStyle}
            to='/user'
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
          >
            <IoMdFlag />
            <span className='text-[20px] ml-4 text-gray-200 font-bold'>
              Report
            </span>
          </NavLink>
        ) : null}
        {pathname !== "/user" ? (
          <NavLink
            to='/graph'
            style={activeLinkStyle}
            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
          >
            <FaChartBar className='' />
            <span className='text-[20px] ml-4 text-gray-200 font-bold'>
              Graph
            </span>
          </NavLink>
        ) : null}

       
      </div>
    </>
  );
};

export default Sidebar;
