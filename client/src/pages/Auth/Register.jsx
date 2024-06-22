import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import {toast} from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/page.css';

export default function Register() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/register`,user
      ); 
      console.log(res);
      if (res.data.success) {
        console.log(user);
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error('Error during registration:', error.response.data.message); // Log error message
      toast.error('Registration failed. Please try again.'); // Show user-friendly message
    }
  };
  

  const handleReset = () => {
    setUser({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
  };
  const handlechange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setUser({...user,[name]:value})
  }

  return (
    <div className='new1'>
      <Layout title={"register-page"}>
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto shadow-2xl p-4">
            <div>
              <img src="/images/register.jpg" alt="img" />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block">Name</label>
              <input type="text" value={user.name} name='name' id="name" onChange={handlechange} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input type="email" value={user.email} name='email' id='email' onChange={handlechange} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block">Password</label>
              <input type="password" value={user.password} name="password" onChange={handlechange} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block">Phone</label>
              <input type="text" value={user.phone} name='phone' onChange={handlechange} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
           <div>
            <label htmlFor="address">address</label>
           <input type="text" value={user.address} name='address' onChange={handlechange} className="w-full border border-gray-300 rounded px-3 py-2 mb-3" />

           </div>
            <div className="flex justify-between mb-7">
              <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" />
              <p><Link to={"/forgot-password"}>forget password?</Link></p>
              
              <input type="button" onClick={handleReset} value="Reset" className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded cursor-pointer" />
            </div>
          </form>
         
        </div>
      </Layout>
     
    </div>
  );
}
