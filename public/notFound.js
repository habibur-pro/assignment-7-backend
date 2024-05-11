"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    return res.status(404).json({
        success: false,
        message: "API NOT FOUND",
        error: "",
    });
};
exports.default = notFound;
