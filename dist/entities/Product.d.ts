import { Collection } from "@mikro-orm/core";
import { CartItem } from "./Cart";
export declare class Product {
    id: string;
    title: string;
    description: string;
    price: number;
    items: Collection<CartItem, object>;
    constructor(title: string, description: string, price: number);
}
