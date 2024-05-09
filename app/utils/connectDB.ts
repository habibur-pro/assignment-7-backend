import mongoose from "mongoose";

require("dotenv").config();

const connectDb = async () => {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("failed to connect MongoDB", error);
  }
};
export default connectDb;
