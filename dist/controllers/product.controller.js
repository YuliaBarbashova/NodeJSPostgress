"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const server_1 = require("../server");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ProductController = express_1.default.Router();
exports.ProductController = ProductController;
ProductController.get("/", authMiddleware_1.authMiddleware, async (req, res) => {
    const products = await server_1.DI.productRepository.findAll({
        orderBy: { title: core_1.QueryOrder.DESC },
        limit: 100,
    });
    res.json({ data: products, error: null });
});
ProductController.get("/:productId", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const product = await server_1.DI.productRepository.findOneOrFail({
            id: req.params.productId,
        });
        res.json({ data: product, error: null });
    }
    catch {
        return res
            .status(404)
            .send({ data: null, error: { message: "No product with such id" } });
    }
});
