import { Schema, model } from "mongoose";
import { TSupply } from "./supply.interface";

const SupplySchema = new Schema<TSupply>(
  {
    id: {
      type: String,
      required: [true, "id is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    quantity: {
      type: String,
      required: [true, "quantity is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
  },
  { timestamps: true }
);
const Supply = model<TSupply>("model", SupplySchema);
export default Supply;
