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
exports.User = void 0;
const uuid_1 = require("uuid");
const core_1 = require("@mikro-orm/core");
const Cart_1 = require("./Cart");
const Order_1 = require("./Order");
let User = class User {
    constructor(email, password, role) {
        this.id = (0, uuid_1.v4)();
        this.orders = new core_1.Collection(this);
        this.email = email;
        this.password = password;
        this.role = role;
    }
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Cart_1.Cart, cart => cart.user),
    __metadata("design:type", Cart_1.Cart)
], User.prototype, "cart", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Order_1.Order, (order) => order.user),
    __metadata("design:type", Object)
], User.prototype, "orders", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String])
], User);
