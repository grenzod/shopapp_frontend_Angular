import { OrderDetail } from "../Models/order.detail";

export interface OrderResponse {
    id: number;
    user_id: number;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    order_date: Date;
    status: string;
    total_money: number;
    shipping_method: string;
    shipping_address: string;
    shipping_date: Date;
    payment_method: string;
    order_details: OrderDetail[]
}