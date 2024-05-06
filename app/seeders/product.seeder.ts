import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";

import { Product } from "../entities";

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Product, {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price(),
    });
  }
}
