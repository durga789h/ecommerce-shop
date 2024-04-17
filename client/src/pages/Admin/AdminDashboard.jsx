import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-red-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <AdminMenu />
          </div>
          <div className="md:col-span-2">
            <div className="card w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-3 border-spacing-2 bg-lime-500 text-white">
              <h3 className="mb-2">Admin Name: {auth?.user?.name}</h3>
              <h3 className="mb-2">Admin Email: {auth?.user?.email}</h3>
              <h3 className="mb-2">Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
