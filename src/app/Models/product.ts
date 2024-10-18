import { ProductImage } from "./product.image";

export interface Product {
    url: string;
    id: number;
    name: string;
    price: number;
    description: string;
    category_id: number;
    thumbnail: string;
    product_images: ProductImage[];
}