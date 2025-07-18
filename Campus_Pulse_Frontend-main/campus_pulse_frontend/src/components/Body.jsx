import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Body = () => {
  const location = useLocation(); // Get the current route

  // Routes where NavBar should NOT be shown
  const hideNavRoutes = ["/login", "/register"];

  return (
    <div>

      <Outlet />

    </div>
  );
};

export default Body;