import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();
const port = process.env.PORT || 5000;
async function main() {
  try {
    app.listen(port, () => {
      console.log("server running on", port);
    });
    await mongoose.connect(process.env.DB_URI as string);
  } catch (error) {
    console.log("database connection failed", error);
  }
}
main();
