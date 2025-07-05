import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../Environments/environment";
import { Observable } from "rxjs";
import { OrderDTO } from "../DTOs/order/order.DTO";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VNPayService {
    private apiGetProducts = `${environment.apiBaseUrl}/payment`;

    constructor(private http: HttpClient) { }

    callbackVNPayUrl(status: string, trackingNumber: string): Observable<any> {
        const requestParams = new HttpParams()
          .set('status', status)
          .set('tracking_number', trackingNumber);
        return this.http.post<any>(`${this.apiGetProducts}/vn-pay-callback`, {}, { params: requestParams });
      }
      

    getVNPayUrl(orderData: OrderDTO): Observable<any> {
        const request = new HttpParams()
        .set('amount', orderData.total_money.toString())
        .set('bankCode', '');
        return this.http.post<any>(`${this.apiGetProducts}/vn-pay`, orderData, {  params: request });
    }
}