import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";

import { User } from "../entities";

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    let userEmail;
    let userWithSameEmail;
    do {
      userEmail = faker.internet.email();
      userWithSameEmail = await em.findOne(User, { email: userEmail });
    } while (userWithSameEmail);
    em.create(User, {
      email: userEmail,
      password: faker.internet.password(),
      role: Math.random() < 0.5 ? "admin" : "user",
    });
  }
}
