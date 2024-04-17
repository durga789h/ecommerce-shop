import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/page.css';
import { useAuth } from '../../context/auth';



export default function Login() {
  const {auth,setAuth}=useAuth();
  const navigate=useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",

  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res=await axios.post(`http://localhost:8000/api/login`,user)
      console.log(res);
      if(res && res.data.success){ //data and success coming from backend
       // console.log(res);
        toast.success(res.data.message);

        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token,
        })
        localStorage.setItem("auth",JSON.stringify(res.data))
        navigate("/");
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(user);

    // Handle form submission logic here
  };

  const handleReset = () => {
    setUser({
      email: "",
      password: "",
     
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
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto shadow-2xl p-4">
           <div>
            <img src="/images/login.jpg" alt="img" />
           </div>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input type="email" value={user.email} name='email' id='email' onChange={handlechange} className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block">Password</label>
              <input type="password" value={user.password} name="password" onChange={handlechange} className="w-full mb-4 border border-gray-300 rounded px-3 py-2" />
            </div>
               
            <div className="flex justify-between mb-9">
              <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" />
              <p><Link to={"/register"} className='text-black underline'>don't have account then click here</Link></p>
              <input type="button" onClick={handleReset} value="Reset" className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded cursor-pointer" />
            </div>
          </form>
        
        </div>
      </Layout>
    </div>
  );
}
