import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4 className="mb-4 text-lg">Dashboard</h4>
       <h2 className="mb-3"><NavLink
          to="/dashboard/user/profile"
          className="w-full mb-3 border p-3 hover:bg-blue-500"
        >
          Profile
        </NavLink> </h2>
        <h2>
        <NavLink
          to="/dashboard/user/orders"
          className="w-full border p-3 hover:bg-blue-400"
        >
          Orders
        </NavLink>
        </h2>
      </div>
    </div>
  );
};

export default UserMenu;
