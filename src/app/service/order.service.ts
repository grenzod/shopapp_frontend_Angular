import { HttpClient } from "@angular/common/http";
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
}