/// <reference types="node" />
import 'reflect-metadata';
import http from 'http';
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { Cart, CartItem } from "./entities/Cart";
import { Order } from "./entities/Order";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
export declare const DI: {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    userRepository: EntityRepository<User>;
    productRepository: EntityRepository<Product>;
    orderRepository: EntityRepository<Order>;
    cartRepository: EntityRepository<Cart>;
    cartItemRepository: EntityRepository<CartItem>;
};
export declare const app: import("express-serve-static-core").Express;
export declare const init: Promise<void>;
