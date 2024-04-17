import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const {auth} = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserMenu />
          </div>
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-md p-6">
              <h3 className="text-lg font-semibold mb-3">
                Welcome, {auth?.user?.name}!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4 sm:mb-0">
                  <h4 className="font-semibold">Email:</h4>
                  <p>{auth?.user?.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Address:</h4>
                  <p>{auth?.user?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
