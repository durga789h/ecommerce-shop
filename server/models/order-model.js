import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: String, // Assuming productId is a string representing the product's ObjectId
        name: String,
        price: Number
      }
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);
const Order= mongoose.model("Order", orderSchema);
export default Order;