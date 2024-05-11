"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "something went wrong";
    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        message,
        err,
    });
};
exports.default = globalErrorHandler;
