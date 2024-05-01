"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.app = exports.DI = void 0;
const dotenv = __importStar(require("dotenv"));
const orm_config_1 = __importDefault(require("./config/orm.config"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const Cart_1 = require("./entities/Cart");
const Order_1 = require("./entities/Order");
const Product_1 = require("./entities/Product");
const User_1 = require("./entities/User");
const routes_1 = __importDefault(require("./routes"));
dotenv.config();
exports.DI = {};
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3001;
exports.init = (async () => {
    exports.DI.orm = await core_1.MikroORM.init(orm_config_1.default);
    exports.DI.em = exports.DI.orm.em;
    exports.DI.userRepository = exports.DI.orm.em.getRepository(User_1.User);
    exports.DI.productRepository = exports.DI.orm.em.getRepository(Product_1.Product);
    exports.DI.orderRepository = exports.DI.orm.em.getRepository(Order_1.Order);
    exports.DI.cartRepository = exports.DI.orm.em.getRepository(Cart_1.Cart);
    exports.DI.cartItemRepository = exports.DI.orm.em.getRepository(Cart_1.CartItem);
    exports.app.use(express_1.default.json());
    exports.app.use((req, res, next) => core_1.RequestContext.create(exports.DI.orm.em, next));
    exports.app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
    // Routes
    exports.app.use("/api", routes_1.default);
    exports.DI.server = exports.app.listen(port, () => {
        console.log(`MikroORM express TS example started at http://localhost:${port}`);
    });
})();
