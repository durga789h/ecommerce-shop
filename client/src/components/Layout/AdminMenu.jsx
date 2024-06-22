import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center bg-gradient-to-tr from-blue-700 to-fuchsia-700 text-white p-3  mr-3">
      <div className="space-y-4">
        <h4 className="mb-4 text-lg lg:text-xl">Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="block py-2 px-4 rounded-md  hover:bg-red-600"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="block py-2 px-4 rounded-md  hover:bg-red-600"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="block py-2 px-4 rounded-md  hover:bg-red-600"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="block py-2 px-4 rounded-md  hover:bg-red-600"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="block py-2 px-4 rounded-md  hover:bg-red-600"
        >
          Users
        </NavLink> 
      </div>
    </div>
  );
};

export default AdminMenu;
