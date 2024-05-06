import * as dotenv from 'dotenv'

import config from './config/orm.config'
import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';

import {Cart, CartItem} from "./entities/Cart";
import {Order} from "./entities/Order";
import {Product} from "./entities/Product";
import {User} from "./entities/User";
import router from "./routes";

dotenv.config();

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
  productRepository: EntityRepository<Product>,
  orderRepository: EntityRepository<Order>,
  cartRepository: EntityRepository<Cart>,
  cartItemRepository: EntityRepository<CartItem>,
};

export const app = express();
const port = process.env.PORT || 3001;

export const init = (async () => {
  DI.orm = await MikroORM.init(config);
  

  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.orderRepository = DI.orm.em.getRepository(Order);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.cartItemRepository = DI.orm.em.getRepository(CartItem);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  
  // Routes
  app.use("/api", router);

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();