import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { authroutes } from "./routes/authroutes.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Track if MongoDB connection is successful
let mongoDBConnectionStatus = false;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    mongoDBConnectionStatus = true; // Connection is successful
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    mongoDBConnectionStatus = false; // Connection failed
  });

// Route to check MongoDB connection status
app.get("/connection-status", (req, res) => {
  if (mongoDBConnectionStatus) {
    res.status(200).send("<h1>Saving server is OK!</h1>");
  } else {
    res.status(500).send("<h1>Connection to MongoDB failed.</h1>");
  }
});

app.use("/auth", authroutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
