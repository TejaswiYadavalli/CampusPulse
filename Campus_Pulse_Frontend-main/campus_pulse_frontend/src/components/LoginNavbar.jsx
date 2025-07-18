
import React from "react";
import {Link} from "react-router-dom";

const LoginNavbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-transparent text-white px-4 py-3">
      {/* Navbar Container */}
      <div className="navbar">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* <img src="../../public/CampuSphereLogo.png" className="h-32 w-44 pt-0"/> */}
          <a className="btn btn-ghost text-xl">Campus Pulse</a>
        </div>

        {/* Navbar Center (Hidden on Small Screens) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li><a href="/">Home</a></li>
            <li><a href="#">Student</a></li>
            <li><a href="#">Faculty</a></li>
            <li><a href="#">Admin</a></li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <a
            className="btn text-white border-white shadow-lg transition-transform duration-300 ease-in-out rounded-lg px-6 py-2 
            hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:scale-105"
            href="/login"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginNavbar;
