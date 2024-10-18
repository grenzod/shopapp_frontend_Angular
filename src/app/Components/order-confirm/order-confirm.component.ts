import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../Responses/orderResponse';
import { OrderService } from '../../service/order.service';
import { environment } from '../../Environments/environment';
import { OrderDetail } from '../../Models/order.detail';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit {
  orderResponse : OrderResponse = {
    id: 19,
    user_id: 6,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [],
  };

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    const orderId = 19;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        debugger
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );
        debugger
        this.orderResponse.order_details = response.order_details.map((order_detail: OrderDetail) => {
          if (!order_detail.product.thumbnail.startsWith('http')) {
            order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
          }
          return order_detail;
        });
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_address = response.shipping_address;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        );
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.status = response.status;

        this.orderResponse.order_details.forEach((order_detail: OrderDetail) => {
          this.orderResponse.total_money += order_detail.price * order_detail.numberOfProducts;
        })
      },
      complete: () => {
        debugger
      },
      error: (err: any) => {
        debugger
        console.error('Error getting order details: ', err);
      }
    });
  }

}
