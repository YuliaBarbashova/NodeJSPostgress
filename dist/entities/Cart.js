"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = exports.Cart = void 0;
const uuid_1 = require("uuid");
const core_1 = require("@mikro-orm/core");
const Product_1 = require("./Product");
const User_1 = require("./User");
const Order_1 = require("./Order");
let Cart = class Cart {
    constructor() {
        this.id = (0, uuid_1.v4)();
        this.isDeleted = false;
        this.items = new core_1.Collection(this);
    }
};
exports.Cart = Cart;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Cart.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", User_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Cart.prototype, "isDeleted", void 0);
__decorate([
    (0, core_1.OneToMany)(() => CartItem, (item) => item.cart),
    __metadata("design:type", Object)
], Cart.prototype, "items", void 0);
exports.Cart = Cart = __decorate([
    (0, core_1.Entity)()
], Cart);
let CartItem = class CartItem {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.CartItem = CartItem;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], CartItem.prototype, "count", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Product_1.Product, { inversedBy: "items" }),
    __metadata("design:type", Product_1.Product)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Cart, { inversedBy: "items" }),
    __metadata("design:type", Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Order_1.Order, { nullable: true }),
    __metadata("design:type", Order_1.Order)
], CartItem.prototype, "order", void 0);
exports.CartItem = CartItem = __decorate([
    (0, core_1.Entity)()
], CartItem);
