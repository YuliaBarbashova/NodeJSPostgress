import { Router } from "express";
import { Collection } from "@mikro-orm/core";

import { DI } from "../server";
import { Cart, CartItem } from "../entities/Cart";
import { Order } from "../entities/Order";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateBody, cartSchema } from "../validators/";

const CartController = Router();

CartController.get("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const user = await DI.userRepository.findOne({ id: userId });
    let cart: Cart | null = await DI.cartRepository.findOne(
      {
        user,
        isDeleted: false,
      },
      { populate: ["items", "items.product"] }
    );

    if (!cart) {
      cart = new Cart();
      cart.user = user!;
      cart.items = new Collection<CartItem>(cart);
      await DI.cartRepository.getEntityManager().persistAndFlush(cart);
    }

    const { id, isDeleted } = cart;
    const cartItems = cart.items
      .getItems()
      .map((item) => ({ product: item.product, count: item.count }));

    return res.status(200).json({
      data: {
        cart: { id, user: userId, isDeleted, items: cartItems },
        total: cart!.items.reduce(
          (total: number, item) => total + item.product.price * item.count,
          0
        ),
      },
      error: null,
    });
  } catch (err) {
    next(err);
  }
});

CartController.put(
  "/",
  authMiddleware,
  validateBody(cartSchema),
  async (req, res, next) => {
    const userId = req.headers["x-user-id"] as string;
    const { productId, count }: { productId: string; count: number } = req.body;
    try {
      const product = await DI.productRepository.findOneOrFail({
        id: productId,
      });

      const user = await DI.userRepository.findOne({ id: userId });
      let cart: Cart | null = await DI.cartRepository.findOne(
        {
          user: userId,
          isDeleted: false,
        },
        { populate: ["items", "items.product"] }
      );

      if (!cart) {
        cart = new Cart();
        cart.user = user!;
        cart.items = new Collection<CartItem>(cart);
        await DI.cartRepository.getEntityManager().persistAndFlush(cart);
      }

      let cartItem = cart.items
        .getItems()
        .find((item) => item.product.id === productId);

      if (!cartItem) {
        cartItem = new CartItem();
        cartItem.product = product;
        cartItem.count = count;
        cartItem.cart = cart;
        cart.items.add(cartItem);
      } else {
        cartItem.count = count;
      }

      await DI.cartItemRepository.getEntityManager().persistAndFlush(cartItem);
      await DI.cartRepository.getEntityManager().persistAndFlush(cart);

      const cartItems = cart.items
        .getItems()
        .map((item) => ({ product: item.product, count: item.count }));

      return res.status(200).json({
        data: {
          cart: { ...cart, items: cartItems, user: userId },
          total: cart.items.reduce(
            (total, item) => total + item.product.price * item.count,
            0
          ),
        },
        error: null,
      });
    } catch (err) {
      if ((err as Error).message === "Product not found") {
        return res.status(404).json({
          data: null,
          error: {
            message: "Product not found",
          },
        });
      } else {
        next(err);
      }
    }
  }
);

CartController.delete("/", authMiddleware, async (req, res, next) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    let cart: Cart | null = await DI.cartRepository.findOneOrFail({
      user: userId,
      isDeleted: false,
    });

    cart.isDeleted = true;

    await DI.cartRepository.getEntityManager().persistAndFlush(cart);

    return res.status(200).json({
      data: { success: true },
      error: null,
    });
  } catch (err) {
    if ((err as Error).message === "Cart not found") {
      return res.status(404).json({
        data: null,
        error: {
          message: "Cart not found",
        },
      });
    } else {
      next(err);
    }
  }
});

CartController.post("/checkout", authMiddleware, async (req, res, next) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    const user = await DI.userRepository.findOne({ id: userId });
    let cart: Cart | null = await DI.cartRepository.findOneOrFail(
      {
        user: userId,
        isDeleted: false,
      },
      { populate: ["items", "items.product"] }
    );

    const order = new Order("New order", 0);
    order.user = user!;
    order.cart = cart;
    const items = cart.items.getItems();
    for (const item of items) {
      order.items.add(item);
    }
    order.total = cart.items
      .getItems()
      .reduce((total, item) => total + item.product.price * item.count, 0);

    await DI.orderRepository.getEntityManager().persistAndFlush(order);

    cart.isDeleted = true;
    await DI.cartRepository.getEntityManager().persistAndFlush(cart);
    
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
  } catch (err) {
    if ((err as Error).message === "Cart not found") {
      return res.status(404).json({
        data: null,
        error: {
          message: "Cart not found",
        },
      });
    } else {
      next(err);
    }
  }
});

export { CartController };
