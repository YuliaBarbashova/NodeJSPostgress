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
exports.Order = exports.Payment = exports.Delivery = void 0;
const uuid_1 = require("uuid");
const core_1 = require("@mikro-orm/core");
const Cart_1 = require("./Cart");
const User_1 = require("./User");
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS["CREATED"] = "created";
    ORDER_STATUS["COMPLETED"] = "completed";
})(ORDER_STATUS || (ORDER_STATUS = {}));
let Delivery = class Delivery {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Delivery = Delivery;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Delivery.prototype, "type", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Delivery.prototype, "address", void 0);
exports.Delivery = Delivery = __decorate([
    (0, core_1.Entity)()
], Delivery);
let Payment = class Payment {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Payment = Payment;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Payment.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Payment.prototype, "creditCard", void 0);
exports.Payment = Payment = __decorate([
    (0, core_1.Entity)()
], Payment);
let Order = class Order {
    constructor(comments = '', total) {
        this.id = (0, uuid_1.v4)();
        this.items = new core_1.Collection(this);
        this.status = ORDER_STATUS.CREATED;
        this.comments = comments;
        this.total = total;
    }
};
exports.Order = Order;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Cart_1.Cart),
    __metadata("design:type", Cart_1.Cart)
], Order.prototype, "cart", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Cart_1.CartItem, (item) => item.order),
    __metadata("design:type", Object)
], Order.prototype, "items", void 0);
__decorate([
    (0, core_1.ManyToOne)({ nullable: true }),
    __metadata("design:type", Payment)
], Order.prototype, "payment", void 0);
__decorate([
    (0, core_1.ManyToOne)({ nullable: true }),
    __metadata("design:type", Delivery)
], Order.prototype, "delivery", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "comments", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
exports.Order = Order = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String, Number])
], Order);
