import { v4 } from "uuid";
import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from "@mikro-orm/core";
import { Product } from "./Product";
import { User } from "./User";
import { Order } from "./Order";

@Entity()
export class Cart {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne()
  user!: User;

  @Property()
  isDeleted: boolean = false;

  @OneToMany(() => CartItem, (item) => item.cart)
  items = new Collection<CartItem>(this);
}

@Entity()
export class CartItem {
  @PrimaryKey()
  id: string = v4();

  @Property()
  count!: number;

  @ManyToOne(() => Product, { inversedBy: "items" })
  product!: Product;

  @ManyToOne(() => Cart, { inversedBy: "items" })
  cart!: Cart;

  @ManyToOne(() => Order, { nullable: true })
  order?: Order;
}
