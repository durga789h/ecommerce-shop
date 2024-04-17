// CheckoutForm.jsx

import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ handlePayment }) => {
  const navigate=useNavigate();
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    handlePayment(stripe, elements);
navigate("/")
  };
  

  return (
    <form onSubmit={handleSubmit}>
    <CardNumberElement/>
    <CardExpiryElement />
     <CardCvcElement />    
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit" 
        disabled={!stripe || !elements || !elements.getElement('card') || !elements.getElement('card').complete}
      >
        {error ? "Retry" : "Pay"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
