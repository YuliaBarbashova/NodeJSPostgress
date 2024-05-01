import { v4 } from "uuid";
import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from "@mikro-orm/core";

import { Cart } from "./Cart";
import { Order, Payment, Delivery } from "./Order";

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4();

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: string;

  @OneToMany(() => Cart, cart => cart.user)
  cart?: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders = new Collection<Order>(this);

  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
