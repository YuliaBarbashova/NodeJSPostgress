import express = require("express");
import jwt from "jsonwebtoken";

import { DI } from "../server";
import { User } from "../entities/User";
import { validateBody, newUserSchema, currentUserSchema } from "../validators/";

const AuthController = express.Router();

AuthController.post(
  "/register",
  validateBody(newUserSchema),
  async (req, res, next) => {
    try {
      const user = new User(req.body.email, req.body.password, req.body.role);
      await DI.userRepository.getEntityManager().persistAndFlush(user);
      const { password, orders, ...rest } = user;
      return res.status(201).json({ data: rest, error: null });
    } catch (err) {
      next(err);
    }
  }
);

AuthController.post(
  "/login",
  validateBody(currentUserSchema),
  async (req, res, next) => {
    try {
      const user = await DI.userRepository.findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (!user) {
        return res.status(404).send({
          data: null,
          error: { message: "No user with such email or password" },
        });
      }
      const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
        expiresIn: "1h",
      });
      return res.json({ data: { token }, error: null });
    } catch (err) {
      next(err);
    }
  }
);

export { AuthController };
