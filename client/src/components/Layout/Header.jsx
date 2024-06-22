import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBuilding, FaBars, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/card";
import { Badge, Select } from "antd";
import axios from 'axios';
import "./Header.css";

const { Option } = Select;

export default function Header() {
  const [categories, setCategories] = useState([]);
  const { auth, setAuth } = useAuth();
  const [cart] = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="bg-gradient-to-br from-fuchsia-700 to-blue-700">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center flex-col lg:flex-row">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link to="/" className="navbar-brand flex items-center text-white lg:hidden">
              <FaBuilding className="mr-2" /> Ecommerce App
            </Link>
            <button className="text-white focus:outline-none lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className="hidden lg:flex items-center">
            <Link to="/" className="navbar-brand flex items-center text-white">
              <FaBuilding className="mr-2" /> Ecommerce App
            </Link>
            <SearchInput className="ml-4" />
          </div>
          <ul className={`flex-col  lg:flex lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 mt-4 lg:mt-0 ${menuOpen ? 'flex' : 'hidden'} w-full lg:w-auto`}>
            <li className="w-full lg:w-auto">
              <NavLink to="/" className="block text-center text-white">
                Home
              </NavLink>
            </li>
            <li className="w-full lg:w-auto">
              <div className="block text-center text-white">
                Categories
              </div>
              <Select
                className='w-full lg:w-auto mt-2 lg:mt-0'
                defaultValue="Select a category"
                style={{ width: 200 }}
                onChange={(value) => {
                  // handle category selection
                }}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}  style={{TextDecoder:"none"}}>
                    <Link to={`/category/${c.slug}`}>
                      {c.name} 
                    </Link>
                  </Option>
                ))}
              </Select>
            </li>
            {!auth?.user ? (
              <>
                <li className="w-full lg:w-auto">
                  <NavLink to="/register" className="block text-center text-white">
                    Register
                  </NavLink>
                </li>
                <li className="w-full lg:w-auto">
                  <NavLink to="/login" className="block text-center text-white">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="w-full lg:w-auto">
                <div className="block text-center text-white">
                  {auth?.user?.name}
                </div>
                <Select
                  className='w-full lg:w-auto mt-2 lg:mt-0'
                  defaultValue="Select an option"
                  style={{ width: 200 }}
                >
                  <Option value="dashboard">
                    <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                      Dashboard
                    </Link>
                  </Option>
                  <Option value="logout">
                    <NavLink onClick={handleLogout} to="/login">
                      Logout
                    </NavLink>
                  </Option>
                </Select>
              </li>
            )}
            <li className="w-full lg:w-auto">
              <NavLink to="/cart" className="block text-center text-white">
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
