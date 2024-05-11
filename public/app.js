"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./modules/User/user.model"));
const notFound_1 = __importDefault(require("./notFound"));
const globalErrorHandler_1 = __importDefault(require("./globalErrorHandler"));
const randomGenerator_1 = __importDefault(require("./utils/randomGenerator"));
const supply_model_1 = __importDefault(require("./modules/Supply/supply.model"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.get("/", (req, res) => {
    throw new Error("test");
    console.log("call");
    res.json({ success: true, message: "welcome" });
});
// REGISTER
app.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const randomId = (0, randomGenerator_1.default)(16);
        // Check if email already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Insert user into the database
        yield user_model_1.default.create({ name, email, password: hashedPassword, id: randomId });
        res.status(201).json({
            status: 2001,
            success: true,
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "User registered failed",
        });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Compare hashed password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRES_IN,
        });
        res.status(200).json({
            success: true,
            status: 200,
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.log("er", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Login failed",
        });
    }
}));
app.post("/supply/create-supply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const { title, category, quantity, description, image } = payload;
        const randomId = (0, randomGenerator_1.default)(16);
        const newSupply = yield supply_model_1.default.create({
            id: randomId,
            title,
            image,
            category,
            quantity,
            description,
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "supply created successfully",
            data: newSupply,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "supply created failed",
            data: null,
        });
    }
}));
app.get("/supply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supply = yield supply_model_1.default.find();
        res.status(200).json({
            success: true,
            status: 200,
            message: "all supply retrieved successfully",
            data: supply,
        });
    }
    catch (error) {
        res.status(200).json({
            success: true,
            status: 200,
            message: "all supply retrieved failed",
            data: null,
        });
    }
}));
// delete
app.delete("/supply/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield supply_model_1.default.findOneAndDelete({ id });
        res.status(200).json({
            success: true,
            status: 200,
            message: "supply deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(200).json({
            success: true,
            status: 200,
            message: "supply deleted failed",
            data: null,
        });
    }
}));
// update
app.patch("/supply/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    try {
        const supply = yield supply_model_1.default.findOneAndUpdate({ id }, Object.assign({}, payload), { new: true });
        res.status(200).json({
            success: true,
            status: 200,
            message: "supply updated successfully",
            data: supply,
        });
    }
    catch (error) {
        res.status(200).json({
            success: true,
            status: 200,
            message: "supply update failed failed",
            data: null,
        });
    }
}));
app.use(notFound_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
