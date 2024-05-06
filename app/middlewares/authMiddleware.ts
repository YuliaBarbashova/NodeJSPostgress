import express from "express";
import { DI } from "../server";

export const authMiddleware: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const userId: string = req.headers["x-user-id"] as string;

  if (!userId) {
    return res.status(403).json({
      data: null,
      error: { message: "You must be authorized user" },
    });
  }

  if (userId === "admin") {
    return next();
  }

  if (
    !(await DI.userRepository.findOne({
      id: userId,
    }))
  ) {
    return res.status(401).json({
      data: null,
      error: { message: "User is not authorized" },
    });
  }

  next();
};
