import { ProductEntity } from './product.js';
export interface CartItemEntity {
    product: ProductEntity;
    count: number;
}
export interface CartEntity {
    id: string;
    userId: string;
    isDeleted: boolean;
    items: CartItemEntity[] | [];
}
