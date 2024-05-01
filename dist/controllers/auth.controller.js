"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
const User_1 = require("../entities/User");
const validators_1 = require("../validators/");
const AuthController = express.Router();
exports.AuthController = AuthController;
AuthController.post("/register", (0, validators_1.validateBody)(validators_1.newUserSchema), async (req, res, next) => {
    try {
        const user = new User_1.User(req.body.email, req.body.password, req.body.role);
        await server_1.DI.userRepository.getEntityManager().persistAndFlush(user);
        const { password, orders, ...rest } = user;
        return res.status(201).json({ data: rest, error: null });
    }
    catch (err) {
        next(err);
    }
});
AuthController.post("/login", (0, validators_1.validateBody)(validators_1.currentUserSchema), async (req, res, next) => {
    try {
        const user = await server_1.DI.userRepository.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (!user) {
            return res.status(404).send({
                data: null,
                error: { message: "No user with such email or password" },
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, "SECRET_KEY", {
            expiresIn: "1h",
        });
        return res.json({ data: { token }, error: null });
    }
    catch (err) {
        next(err);
    }
});
