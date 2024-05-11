"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomGenerator = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
};
exports.default = randomGenerator;
