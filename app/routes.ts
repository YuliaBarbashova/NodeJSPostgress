import { Router } from "express";

import {
  ProductController,
  CartController,
  AuthController,
} from "./controllers";

const router = Router();

router.use("/products", ProductController);
router.use("/profile/cart", CartController);
router.use("/auth", AuthController);

export default router;
