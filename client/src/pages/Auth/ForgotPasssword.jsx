import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
 // const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/forgot-password", {
        email,
        newPassword,
        
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center mt-10">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <form onSubmit={handleSubmit} className="mt-5">
              <h4 className="text-center mb-4">RESET PASSWORD</h4>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-2 sm:mb-3 w-full p-1"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
             
              <div className="mb-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control mb-2 sm:mb-3 w-full p-1"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-full bg-blue-600 rounded-sm text-white p-3">
                  RESET
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
