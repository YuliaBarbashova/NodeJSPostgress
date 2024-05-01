"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.use("/products", controllers_1.ProductController);
router.use("/profile/cart", controllers_1.CartController);
router.use("/auth", controllers_1.AuthController);
exports.default = router;
