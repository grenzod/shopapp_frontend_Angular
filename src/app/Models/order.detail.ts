import { Product } from "./product"

export interface OrderDetail {
    id: number
    product: Product
    price: number
    numberOfProducts: number
    total_money: number
    colour: string
}