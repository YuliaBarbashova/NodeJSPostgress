import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";


import { UserSeeder } from "./user.seeder";
import { ProductSeeder } from "./product.seeder";
import { CartSeeder } from "./cart.seeder";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const usersNumber = 3;
    const productsNumber = 3;
    const cartsNumber = 3;

    const userSeeder = new UserSeeder();
    const productSeeder = new ProductSeeder();
    const cartSeeder = new CartSeeder();

    await Promise.all(
      Array(usersNumber)
        .fill(0)
        .map(async () => {
          await userSeeder.run(em);
        })
    );

    await Promise.all(
      Array(productsNumber)
        .fill(0)
        .map(async () => {
          await productSeeder.run(em);
        })
    );

    await Promise.all(
        Array(cartsNumber)
          .fill(0)
          .map(async () => {
            await cartSeeder.run(em);
          })
      );

    
  }
}
