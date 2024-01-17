import React from "react";
import { logo } from "../assets";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div
        className="w-full flex justify-between bg-white 
      items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain " />
        </Link>
        <Link
          to="/create"
          className="font-inter text-white 
          bg-[#6469ff] font-medium px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
