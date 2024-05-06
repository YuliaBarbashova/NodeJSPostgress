import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/core";
import { faker } from "@faker-js/faker";

import { Cart, CartItem, Product, User } from "../entities";

export class CartSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await em.find(User, {});
    const products = await em.find(Product, {});

    let randomUser;
    let userCart;
    do {
      randomUser = users[Math.floor(Math.random() * users.length)];
      userCart = await em.findOne(Cart, { user: randomUser, isDeleted: false });
    } while (userCart);

    const numberOfProductsInCart =
      Math.floor(Math.random() * products.length) + 1;

    const cart = new Cart();
    cart.user = randomUser;
    cart.isDeleted = Math.random() < 0.5;

    for (let j = 0; j < numberOfProductsInCart; j++) {
      let randomProduct;
      let cartProduct;
      do {
        randomProduct = products[Math.floor(Math.random() * products.length)];
        cartProduct = await em.findOne(CartItem, {
          product: randomProduct,
          cart: cart,
        });
      } while (cartProduct);

      const cartItem = new CartItem();
      cartItem.cart = cart;
      cartItem.product = randomProduct;
      cartItem.count = faker.number.int({ min: 1, max: 20 });
      await em.persistAndFlush(cartItem);
      cart.items.add(cartItem);
    }

    await em.persistAndFlush(cart);
  }
}
