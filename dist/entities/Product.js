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
exports.Product = void 0;
const uuid_1 = require("uuid");
const core_1 = require("@mikro-orm/core");
const Cart_1 = require("./Cart");
let Product = class Product {
    constructor(title, description, price) {
        this.id = (0, uuid_1.v4)();
        this.items = new core_1.Collection(this);
        this.title = title;
        this.description = description;
        this.price = price;
    }
};
exports.Product = Product;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Cart_1.CartItem, (item) => item.product),
    __metadata("design:type", Object)
], Product.prototype, "items", void 0);
exports.Product = Product = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String, String, Number])
], Product);
