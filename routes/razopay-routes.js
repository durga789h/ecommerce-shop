import express from 'express';
import { razorpayTokenController, razorpayPaymentController, razorpaySuccessController } from '../controllers/razopay-controller.js';
import { requiredSignIn } from '../middlewares/auth-middleware.js';

const router = express.Router();

// Route for generating a Razorpay token
router.post('/token',requiredSignIn, razorpayTokenController);

// Route for processing a Razorpay payment
router.post('/payment',requiredSignIn, razorpayPaymentController);
router.post("/success",razorpaySuccessController);

export default router;
