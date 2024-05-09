import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, "id is required"],
    },
    name: { type: String, required: [true, "name is required"] },
    password: { type: String, required: [true, "password is required"] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model<TUser>("user", UserSchema);
export default User;
