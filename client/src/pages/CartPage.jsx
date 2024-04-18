import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/card";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import logo from '../../public/images/s3.png';
import axios from "axios";
import {toast} from 'react-toastify';

function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}



function CartPage() {
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let totals
  // Total price calculation
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price ; // Multiply price by quantity
    });
    console.log(total,">>>><M,,,,")
    totals=total;
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  // Remove item from cart
  const removeCartItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    try {
        // Fetch Razorpay token from your backend
        const tokenResponse = await axios.post("http://localhost:8000/api/razopay/token", {
          total: totals,
      }, {
          headers: {
              Authorization: auth?.token
          }
      });
        const { token, id: orderId, amount} = tokenResponse.data;

        // Fetch order data from your backend
        const orderResponse = await axios.post("http://localhost:8000/api/razopay/payment", {
            token: token,
            cart: cart,// Pass the cart data to the backend for order calculation
        }, {
            headers: {
                Authorization: auth?.token
            }
        });

        const {  currency } = orderResponse.data;

        const options = {
            key: "rzp_test_8lsXcf8nMk9KPG", // Enter the Key ID generated from the Dashboard
            amount:amount ,
            currency: currency,
            name: auth?.user,
            description: "Test Transaction",
            image: { logo },
            order_id: orderId,
            handler: async function (response) {
                const data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:8000/api/razopay/success", data);
                console.log(result);

                alert(result.msg);
            },
            prefill: {
                name: auth?.user,
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment Completed Successfully ");
    } catch (error) {
        console.log(error);
        alert("Error occurred while fetching order data. Please try again later.");
    }
}

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="py-8">
          <h1 className="text-center text-3xl font-bold mb-4">
            {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
          </h1>
          <p className="text-center mb-4">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : " Your Cart Is Empty"}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {cart?.map((p, i) => (
                <div className="flex items-center border-b pb-4 mb-4" key={i}>
                  <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                    className="w-24 h-24 object-cover mr-4"
                    alt={p.name}
                  />
                  <div>
                    <p className="font-bold">{p.name}</p>
                    {p.description && (
                      <p className="text-gray-500">{p.description.substring(0, 30)}</p>
                    )}
                    <p>Price: {p.price}</p>
                  </div>
                  <button
                    className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div>
              <div className="bg-gray-100 p-6 rounded">
                <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                <p className="mb-4">Total | Checkout | Payment</p>
                <hr />
                <h4 className="font-bold text-xl mt-4">Total: {totalPrice()} </h4>
                <div>
                  <h2>Payment Form</h2>
                  <button className="App-link bg-orange-500 text-white rounded-md p-3 shadow-2xl" onClick={displayRazorpay}>
                    Pay {totalPrice()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
