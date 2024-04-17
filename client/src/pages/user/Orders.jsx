import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserMenu />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-center text-2xl font-semibold mb-6">All Orders</h1>
            {orders.map((order, index) => (
              <div key={index} className="border shadow-md mb-6 p-4">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{order.status}</td>
                      <td>{order.buyer.name}</td>
                      <td>{moment(order.createAt).fromNow()}</td>
                      <td>{order.payment.success ? "Success" : "Failed"}</td>
                      <td>{order.products.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {order.products.map((product,i) => (
                    <div key={i} className="flex items-center bg-white rounded-lg shadow-md p-4">
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex flex-col justify-center ml-4">
                        <p className="font-semibold">{product.name}</p>
                        <p>{product.description.substring(0, 30)}</p>
                        <p>Price: {product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
