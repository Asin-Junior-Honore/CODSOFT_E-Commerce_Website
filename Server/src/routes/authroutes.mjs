import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.mjs";
import CartItem from "../models/cartItem.mjs";
import authMiddleware from "../middlewares/authMiddleware.js";
import initializePayment from "../controllers/controllers.js";
const router = express.Router();

router.post("/cart/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const existingCartItem = await CartItem.findOne({
      user: userId,
      "product.id": productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      const { productName, productImage, productPrice } = req.body;

      const cartItem = new CartItem({
        user: userId,
        product: {
          id: productId,
          name: productName,
          image: productImage,
          price: productPrice,
        },
        quantity,
      });

      await cartItem.save();
    }

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email address already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const userEmail = user.email;
    const cartItems = await CartItem.find({ user: userId });
    res.status(200).json({ cartItems, userEmail });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/cart/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const cartItemToDelete = await CartItem.findOneAndDelete({
      user: userId,
      "product.id": productId,
    });

    if (!cartItemToDelete) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const cartItems = await CartItem.find({ user: userId });
    const totalItemsInCart = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    res.status(200).json({ username: user.username, totalItemsInCart });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/acceptpayment", initializePayment.acceptPayment);

router.delete("/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await CartItem.deleteMany({ user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No items found in cart" });
    }

    res
      .status(200)
      .json({ message: "All items removed from cart successfully" });
  } catch (error) {
    console.error("Error deleting all items from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as authroutes };
