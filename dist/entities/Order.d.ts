import { Collection } from "@mikro-orm/core";
import { CartItem, Cart } from "./Cart";
import { User } from "./User";
declare enum ORDER_STATUS {
    CREATED = "created",
    COMPLETED = "completed"
}
export declare class Delivery {
    id: string;
    type?: string;
    address?: string;
}
export declare class Payment {
    id: string;
    type?: string;
    address?: string;
    creditCard?: string;
}
export declare class Order {
    id: string;
    user: User;
    cart: Cart;
    items: Collection<CartItem, object>;
    payment?: Payment;
    delivery?: Delivery;
    comments?: string;
    status: ORDER_STATUS;
    total: number;
    constructor(comments: string | undefined, total: number);
}
export {};
