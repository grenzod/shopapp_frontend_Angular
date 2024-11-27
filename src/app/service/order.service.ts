import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../Environments/environment";
import { OrderDTO } from "../DTOs/order/order.DTO";
import { Order } from "../Models/order";
import { Observable } from "rxjs";
import { OrderResponse } from "../Responses/orderResponse";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiGetProducts = `${environment.apiBaseUrl}/orders`;

    constructor(private http: HttpClient) { }

    placeOrder(orderData: OrderDTO): Observable<Order>{
        return this.http.post<Order>(`${this.apiGetProducts}`, orderData);
    }

    getOrderById(orderId: number): Observable<OrderResponse>{
        return this.http.get<OrderResponse>(`${this.apiGetProducts}/${orderId}`);
    }

    getOrdersByUserId(userId: number): Observable<OrderResponse[]>{
        return this.http.get<OrderResponse[]>(`${this.apiGetProducts}/user/${userId}`);
    }

    getOrders(key: string, page: number, limit: number): Observable<OrderResponse[]>{
        const params = new HttpParams()
        .set('key', key)
        .set('page', page.toString())
        .set('limit', limit.toString());

        return this.http.get<OrderResponse[]>(`${this.apiGetProducts}/get-ordes-by-key`, { params });
    }
}