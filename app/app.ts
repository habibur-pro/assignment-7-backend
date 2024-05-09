import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import connectDb from "./utils/connectDB";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "./modules/User/user.model";
import notFound from "./notFound";
import globalErrorHandler from "./globalErrorHandler";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes

app.get("/", (req, res) => {
  throw new Error("test");
  console.log("call");
  res.json({ success: true, message: "welcome" });
});

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      status: 2001,
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "User registered failed",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );
    res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Login failed",
    });
  }
});
app.use(notFound);
app.use(globalErrorHandler);
export default app;
