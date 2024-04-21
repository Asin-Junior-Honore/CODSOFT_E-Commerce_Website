import mongoose from "mongoose";

// Define the schema for the CartItem model
const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  product: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the CartItem model based on the schema
const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
