import express from "express";
import { QueryOrder } from "@mikro-orm/core";

import { DI } from "../server";
import { authMiddleware } from "../middlewares/authMiddleware";

const ProductController = express.Router();

ProductController.get("/", authMiddleware, async (req, res) => {
  const products = await DI.productRepository.findAll({
    orderBy: { title: QueryOrder.DESC },
    limit: 100,
  });

  res.json({ data: products, error: null });
});

ProductController.get("/:productId", authMiddleware, async (req, res) => {
  try {
    const product = await DI.productRepository.findOneOrFail({
      id: req.params.productId,
    });
    res.json({ data: product, error: null });
  } catch {
    return res
      .status(404)
      .send({ data: null, error: { message: "No product with such id" } });
  }
});

export { ProductController };
