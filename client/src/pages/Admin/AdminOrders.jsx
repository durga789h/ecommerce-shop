import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const {auth, setAuth} = useAuth();
  
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/all-orders");
      console.log(data);
      setOrders(data.orders);
      console.log(data.orders)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`http://localhost:8000/api/order-status/${orderId}`, {
        status: value,
      });
      console.log(data); 
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Layout title={"All Orders Data"}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4">
          <AdminMenu />
        </div>
        <div className="lg:w-3/4 px-4 py-2">
          <h1 className="text-center text-2xl lg:text-3xl font-bold mb-4">All Orders</h1>
          {orders?.map((o, i) => (
            <div className="border shadow mb-4 overflow-x-auto" key={i}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Buyer</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">
                      <Select
                        variant={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="px-4 py-2">{o?.buyer?.name}</td>
                    <td className="px-4 py-2">{moment(o?.createdAt).fromNow()}</td>
                   
                    <td className="px-4 py-2">{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                {o?.products?.map((p, i) => (
                  <div className="border p-4" key={i}>
                    <img
                      src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-32 object-cover mb-2"
                    />
                    <p className="text-lg font-bold">{p.name}</p>
                   { /*<p>{p.description.substring(0, 30)}</p>*/}
                    <p>Price: {p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
