import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center bg-blue-400 p-3 text-red-600 mr-3">
      <div className="space-y-4">
        <h4 className="mb-4 text-lg lg:text-xl">Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gray-200"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gray-200"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gray-200"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gray-200"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gray-200"
        >
          Users
        </NavLink> 
      </div>
    </div>
  );
};

export default AdminMenu;
