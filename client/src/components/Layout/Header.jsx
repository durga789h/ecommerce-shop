import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBuilding } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/card";
import { Badge } from "antd";
import { Select } from "antd";
const { Option } = Select;
import axios from 'axios';
import "./Header.css";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const { auth, setAuth } = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      console.log(data)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <nav className="bg-orange-400">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center flex-col lg:flex-row">
        <div className="flex items-center">
            <Link to="/" className="navbar-brand flex items-center text-white">
              <FaBuilding className="mr-2" /> Ecommerce App
            </Link>
          <SearchInput />
          </div>
          <ul className="flex justify-center lg:justify-end items-center space-x-4 mt-4 lg:mt-0">
            <li>
              <NavLink to="/" className="text-white">
                Home
              </NavLink>
            </li>
            <li>
              <Link className="relative text-white" to={"/categories"}>

              <div className="text-white cursor-pointer">
                Categories
              </div>
              </Link>
              
              <Select 
                className='w-full'
                defaultValue="Select a category"
                style={{ width: 200 }}
                onChange={(value) => {
                  setCategory(value);
                  // Redirect to the selected category page using react-router-dom
                  // Example: history.push(`/category/${value}`);
                }}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    <Link className="text-center" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </Option>
                ))}
              </Select>
            </li>
            {!auth?.user ? (
              <>
                <li className="w-full mb-2">
                  <NavLink to="/register" className="text-white">
                    Register
                  </NavLink>
                </li>
                <li className="w-full mb-2">
                  <NavLink to="/login" className="text-white">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <div className="w-full mb-2">
                <NavLink className="text-white" role="button" style={{ border: "none" }}>
                  {auth?.user?.name}
                </NavLink>
                <Select className='w-full' defaultValue="Select a dashboard" style={{ width: 200 }}>
                  <Option value="dashboard" >
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                      Dashboard
                    </NavLink>
                  </Option>
                  <Option value="logout">
                    <NavLink onClick={handleLogout} to="/login">
                      Logout
                    </NavLink>
                  </Option>
                </Select>
              </div>
            )}
            <li className="w-full mt-2">
              <NavLink to="/cart" className="text-white">
                <Badge count={cart?.length} showZero offset={[10, -5]}>
                  Cart
                </Badge>
              </NavLink>
            </li>
          </ul>
          </div>
        </div>
    
    </nav>
  );
}
