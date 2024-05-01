"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserSchema = exports.newUserSchema = exports.cartSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cartSchema = joi_1.default.object({
    productId: joi_1.default.string().required(),
    count: joi_1.default.number().strict().integer().min(0).required(),
});
exports.newUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
});
exports.currentUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
