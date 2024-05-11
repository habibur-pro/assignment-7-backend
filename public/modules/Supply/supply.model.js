"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SupplySchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const Supply = (0, mongoose_1.model)("model", SupplySchema);
exports.default = Supply;
