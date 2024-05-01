import { Collection } from "@mikro-orm/core";
import { Product } from "./Product";
import { User } from "./User";
import { Order } from "./Order";
export declare class Cart {
    id: string;
    user: User;
    isDeleted: boolean;
    items: Collection<CartItem, object>;
}
export declare class CartItem {
    id: string;
    count: number;
    product: Product;
    cart: Cart;
    order?: Order;
}
