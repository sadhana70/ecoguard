import React, { useState } from "react";
import { BsAppIndicator } from "react-icons/bs";
import { IoMdFlag } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const UserSideBar = () => {
  const [sidebarHidden, setSidebarHidden] = useState(true);

  const isLargeScreen = useMediaQuery({minWidth: 768});

  const toggleSidebar = () => {
    setSidebarHidden(isLargeScreen ? false : !sidebarHidden);
  };

  return (
    <>
      {sidebarHidden && (
        <div className="menu-icon">
          <BiMenu
            className="cursor-pointer lg:hidden m-3 text-2xl"
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
              className="cursor-pointer lg:hidden m-2"
              onClick={toggleSidebar}
            />
          </div>
        )}

        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex flex-col">
            <div className="flex items-center">
              <BsAppIndicator className="px-2 py-1 rounded-md bg-blue-600" />
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                BalenAI
              </h1>
            </div>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <NavLink
          to="/user"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <IoMdFlag className="" />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Report
          </span>
        </NavLink>
      </div>
    </>
  );
};

export default UserSideBar;
