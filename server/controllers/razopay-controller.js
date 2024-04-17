import Razorpay from "razorpay";
import Order from "../models/order-model.js";
import productModel from "../models/product-model.js";



// Razorpay instance setup
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Razorpay token endpoint
export const razorpayTokenController = async (req, res) => {
  try {
    
     let totalAmount = req.body.total;
     console.log(">>>>>>>>>>>>>",req.body)
    // const perPage = 6;
    // const page = req.params.page ? req.params.page : 1;
    // const products = await productModel
    //   .find({})
    //   .select("price")
    //   .skip((page - 1) * perPage)
    //   .limit(perPage)
    //   .sort({ createdAt: -1 });

    // // Calculate total amount
    // let totalAmount = 0;
    // for (const product of products) {
    //   totalAmount += product.price;
    // }

    // Ensure total amount is at least INR 1.00
    if (totalAmount < 1) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BAD_REQUEST_ERROR',
          description: 'The amount must be at least INR 1.00',
          source: 'business',
          step: 'payment_initiation',
          reason: 'input_validation_failed',
          metadata: {},
          field: 'amount'
        }
      });
    }

      // Define options for creating the order
      const options = {
        amount: totalAmount*100, // Total amount in paise
        currency: "INR",
      };
      console.log(options)

    // Create the Razorpay order
    razorpayInstance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(order);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Razorpay payment endpoint
export const razorpayPaymentController = async (req, res) => {
  try {
    const { orderId, paymentId, signature, cart } = req.body;

    // Verify the Razorpay signature - omitted for brevity, make sure to implement this

    // Calculate total amount from cart
    let total = cart.reduce((acc, item) => acc + item.price, 0);
    

    // Create an instance of the order model and save to database
    const order = new Order({
      products: cart,
      payment: { orderId, paymentId, signature }, // Example, adjust as per your requirements
      buyer: req.user._id,
    });
    await order.save();

    res.json({ order });  
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const razorpaySuccessController = async (req, res) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    // Save payment details or update order status in your database
    // For example:
    const order = await Order.findOneAndUpdate(
      { _id: orderCreationId },
      { 
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId,
        signature: razorpaySignature,
        status: "paid" 
      },
      { new: true }
    );

    // Send success response back to frontend
    res.json({ msg: "Payment completed successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
