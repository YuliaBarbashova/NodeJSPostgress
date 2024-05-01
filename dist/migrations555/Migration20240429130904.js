"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240429130904 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240429130904 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "product" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');
        this.addSql('create table "order" ("id" varchar(255) not null, "user_id" varchar(255) not null, "cart_id" varchar(255) not null, "items" jsonb not null, "payment_type" varchar(255) null, "payment_address" varchar(255) null, "payment_credit_card" varchar(255) null, "delivery_type" varchar(255) null, "delivery_address" varchar(255) null, "comments" varchar(255) null, "status" smallint not null, "total" int not null, constraint "order_pkey" primary key ("id"));');
        this.addSql('create table "cart" ("id" varchar(255) not null, "user_id" varchar(255) not null, "is_deleted" boolean not null, "items" jsonb not null, constraint "cart_pkey" primary key ("id"));');
        this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    }
    async down() {
        this.addSql('drop table if exists "product" cascade;');
        this.addSql('drop table if exists "order" cascade;');
        this.addSql('drop table if exists "cart" cascade;');
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20240429130904 = Migration20240429130904;
