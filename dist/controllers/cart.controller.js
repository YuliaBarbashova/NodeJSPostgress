"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const express_1 = require("express");
const core_1 = require("@mikro-orm/core");
const server_1 = require("../server");
const Cart_1 = require("../entities/Cart");
const Order_1 = require("../entities/Order");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validators_1 = require("../validators/");
const CartController = (0, express_1.Router)();
exports.CartController = CartController;
CartController.get("/", authMiddleware_1.authMiddleware, async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"];
        const user = await server_1.DI.userRepository.findOne({ id: userId });
        let cart = await server_1.DI.cartRepository.findOne({
            user,
            isDeleted: false,
        }, { populate: ["items", "items.product"] });
        if (!cart) {
            cart = new Cart_1.Cart();
            cart.user = user;
            cart.items = new core_1.Collection(cart);
            await server_1.DI.cartRepository.getEntityManager().persistAndFlush(cart);
        }
        const { id, isDeleted } = cart;
        const cartItems = cart.items
            .getItems()
            .map((item) => ({ product: item.product, count: item.count }));
        return res.status(200).json({
            data: {
                cart: { id, user: userId, isDeleted, items: cartItems },
                total: cart.items.reduce((total, item) => total + item.product.price * item.count, 0),
            },
            error: null,
        });
    }
    catch (err) {
        next(err);
    }
});
CartController.put("/", authMiddleware_1.authMiddleware, (0, validators_1.validateBody)(validators_1.cartSchema), async (req, res, next) => {
    const userId = req.headers["x-user-id"];
    const { productId, count } = req.body;
    try {
        const product = await server_1.DI.productRepository.findOneOrFail({
            id: productId,
        });
        const user = await server_1.DI.userRepository.findOne({ id: userId });
        let cart = await server_1.DI.cartRepository.findOne({
            user: userId,
            isDeleted: false,
        }, { populate: ["items", "items.product"] });
        if (!cart) {
            cart = new Cart_1.Cart();
            cart.user = user;
            cart.items = new core_1.Collection(cart);
            await server_1.DI.cartRepository.getEntityManager().persistAndFlush(cart);
        }
        let cartItem = cart.items
            .getItems()
            .find((item) => item.product.id === productId);
        if (!cartItem) {
            cartItem = new Cart_1.CartItem();
            cartItem.product = product;
            cartItem.count = count;
            cartItem.cart = cart;
            cart.items.add(cartItem);
        }
        else {
            cartItem.count = count;
        }
        await server_1.DI.cartItemRepository.getEntityManager().persistAndFlush(cartItem);
        await server_1.DI.cartRepository.getEntityManager().persistAndFlush(cart);
        const cartItems = cart.items
            .getItems()
            .map((item) => ({ product: item.product, count: item.count }));
        return res.status(200).json({
            data: {
                cart: { ...cart, items: cartItems, user: userId },
                total: cart.items.reduce((total, item) => total + item.product.price * item.count, 0),
            },
            error: null,
        });
    }
    catch (err) {
        if (err.message === "Product not found") {
            return res.status(404).json({
                data: null,
                error: {
                    message: "Product not found",
                },
            });
        }
        else {
            next(err);
        }
    }
});
CartController.delete("/", authMiddleware_1.authMiddleware, async (req, res, next) => {
    const userId = req.headers["x-user-id"];
    try {
        let cart = await server_1.DI.cartRepository.findOneOrFail({
            user: userId,
            isDeleted: false,
        });
        cart.isDeleted = true;
        await server_1.DI.cartRepository.getEntityManager().persistAndFlush(cart);
        return res.status(200).json({
            data: { success: true },
            error: null,
        });
    }
    catch (err) {
        if (err.message === "Cart not found") {
            return res.status(404).json({
                data: null,
                error: {
                    message: "Cart not found",
                },
            });
        }
        else {
            next(err);
        }
    }
});
CartController.post("/checkout", authMiddleware_1.authMiddleware, async (req, res, next) => {
    const userId = req.headers["x-user-id"];
    try {
        const user = await server_1.DI.userRepository.findOne({ id: userId });
        let cart = await server_1.DI.cartRepository.findOneOrFail({
            user: userId,
            isDeleted: false,
        }, { populate: ["items", "items.product"] });
        const order = new Order_1.Order("New order", 0);
        order.user = user;
        order.cart = cart;
        const items = cart.items.getItems();
        for (const item of items) {
            order.items.add(item);
        }
        order.total = cart.items
            .getItems()
            .reduce((total, item) => total + item.product.price * item.count, 0);
        await server_1.DI.orderRepository.getEntityManager().persistAndFlush(order);
        cart.isDeleted = true;
        await server_1.DI.cartRepository.getEntityManager().persistAndFlush(cart);
        const cartItems = cart.items
            .getItems()
            .map((item) => ({ product: item.product, count: item.count }));
        return res.status(200).json({
            data: {
                order: {
                    ...order,
                    user: userId,
                    cart: cart.id,
                    items: cartItems
                },
            },
            error: null,
        });
    }
    catch (err) {
        if (err.message === "Cart not found") {
            return res.status(404).json({
                data: null,
                error: {
                    message: "Cart not found",
                },
            });
        }
        else {
            next(err);
        }
    }
});
