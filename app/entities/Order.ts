import { v4 } from "uuid";
import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  OneToMany,
  Collection,

} from "@mikro-orm/core";
import { CartItem, Cart } from "./Cart";
import { User } from "./User";

enum ORDER_STATUS {
  CREATED = "created",
  COMPLETED = "completed",
}

@Entity()
export class Delivery {
  @PrimaryKey()
  id: string = v4();

  @Property()
  type?: string;

  @Property()
  address?: string;
}

@Entity()
export class Payment {
  @PrimaryKey()
  id: string = v4();

  @Property()
  type?: string;

  @Property()
  address?: string;

  @Property()
  creditCard?: string;
}

@Entity()
export class Order {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Cart)
  cart!: Cart;

  @OneToMany(() => CartItem, (item) => item.order)
  items = new Collection<CartItem>(this);

  @ManyToOne({ nullable: true })
  payment?: Payment;

  @ManyToOne({ nullable: true })
  delivery?: Delivery;

  @Property({ nullable: true })
  comments?: string;

  @Property()
  status: ORDER_STATUS = ORDER_STATUS.CREATED;

  @Property()
  total!: number;

  constructor(comments: string = '', total: number) {
    this.comments = comments;
    this.total = total;
  }
}
