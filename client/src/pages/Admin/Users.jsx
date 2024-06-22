import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Users = () => {
  const { auth } = useAuth();
  const [newupdatedata, setNewupdatedata] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/data", {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setNewupdatedata(data.users);
      } else {
        console.error("Error:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [auth?.token]); // Fetch users when auth token changes

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/data/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        getUsers(); // Refresh user list after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="bg-gradient-br from-fuchsia-600 to-blue-600 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex">
            <div className="lg:w-1/4">
              <AdminMenu />
            </div>
            <div className="lg:w-3/4">
              <h1 className="text-center lg:text-left text-2xl mb-4 text-white">
                All Users
              </h1>
              <div className="shadow-md rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  {/* Conditionally apply flex and flex-wrap classes for horizontal table on mobile */}
                  <div className="flex flex-wrap">
                    {newupdatedata.map((value, i) => (
                      <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                        <div className="border rounded-lg p-4 text-white bg-gradient-to-br from-blue-700 to-fuchsia-700">
                          <h2 className="text-lg font-bold mb-2">{value.name}</h2>
                          <p className="text-sm mb-1">{value.email}</p>
                          <p className="text-sm mb-1">{value.phone}</p>
                          <p className="text-sm mb-1">{value.address}</p>
                          <div className="flex justify-center mt-2">
                            <Link
                              to={`/dashboard/admin/users/${value._id}/edit`}
                              className="bg-red-600  hover:text-orange-700 hover:underline text-white py-1 px-4 rounded-md mr-2"
                            >
                              Edit
                            </Link>
                            <span
                              className="text-white cursor-pointer hover:text-red-700 hover:underline bg-red-600 py-1 px-4 rounded-md"
                              onClick={() => deleteUser(value._id)}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
