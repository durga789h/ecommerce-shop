// src/components/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [userId, setUserId] = useState('');

  const handlePayment = async () => {
    // Get selected products and user ID
    // Perform any necessary validation
    const products = [];
    // You can get products and quantities from the state
    // or from the DOM if you have the product IDs in the HTML
    const payload = { products, userId };

    try {
      const response = await axios.post('/api/payment', payload);
      // Redirect to Razorpay payment page
      window.location.href = `https://api.razorpay.com/v1/payment/${response.data.orderId}`;
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <label htmlFor="userId">User ID:</label>
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
}

export default PaymentForm;
