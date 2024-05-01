import { Collection } from "@mikro-orm/core";
import { Cart } from "./Cart";
import { Order } from "./Order";
export declare class User {
    id: string;
    email: string;
    password: string;
    role: string;
    cart?: Cart;
    orders: Collection<Order, object>;
    constructor(email: string, password: string, role: string);
}
