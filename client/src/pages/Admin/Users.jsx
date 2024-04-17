import React, {useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Users = () => {
  const { auth} = useAuth();
  const [newupdatedata, setNewupdatedata] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/data", {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        }
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setNewupdatedata(data.users);
      } else {
        // Handle error response
        console.error('Error:', res.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []); //

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
        getUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

console.log(newupdatedata);
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="lg:flex">
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>
          <div className="lg:w-3/4">
           
            <h1 className="text-center text-2xl">All Users</h1>
            <table className="center border">
          <thead className="boder">
            <tr className="border">
              <th className="w-1/2 sm:w-1/5 py-2">name</th>
              <th  className="w-full sm:w-1/5 py-2">Email</th>
              <th className="sm:table-cell py-2">Phone</th>
              <th  className=" sm:table-cell w-1/5 py-2">Address</th>
              <th>Update</th>
              <th >Delete</th>
            </tr>
          </thead>
          <tbody>
            
          {newupdatedata.map((value,i)=>(
    <tr key={i}>
        <td  className="py-2">{value.name}</td>
        <td  className="py-2">{value.email}</td>
        <td className="border text-center px-4">{value.phone}</td>
        <td className="border text-cente px-4">{value.address}</td>
        <td className="border  bg-orange-500 rounded-md p-2 border-spacing-6">
                  <Link
                    to={`/dashboard/admin/users/${value._id}/edit`}
                    className="text-white hover:underlinep-3 mt-3"
                  >
                    Edit
                  </Link>
                </td>
                <td className=" border text-center bg-red-600 text-white rounded-md p-2">
                  <span
                    className=" cursor-pointer hover:underline"
                    onClick={() => deleteUser(value._id)}
                  >
                    Delete
                  </span>
                </td>
        
    </tr>
))}

      
          </tbody>
        </table>
             
        
           
        
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;