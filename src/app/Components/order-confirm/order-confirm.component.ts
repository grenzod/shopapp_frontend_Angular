import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../Responses/orderResponse';
import { OrderService } from '../../service/order.service';
import { environment } from '../../Environments/environment';
import { OrderDetail } from '../../Models/order.detail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit {

  userId: number = 2;
  response: OrderResponse[] = [];

  constructor(private orderService: OrderService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderByUserId();
    localStorage.setItem('idP', '4');
  }

  getOrderByUserId(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('id'));
    });
    const userId = this.userId;
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (response: OrderResponse[]) => {
        response.forEach((order: any) => {
          order.order_details.forEach((order_detail: OrderDetail) => {
            if (!order_detail.product.thumbnail.startsWith('http')) {
              order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
            }
          });
          order.order_details.forEach((order_detail: OrderDetail) => {
            order.total_money += order_detail.price * order_detail.numberOfProducts;
          })
        })

        this.response = response;
      },
      error: (err: any) => {
        console.error('Error getting order details: ', err);
      }
    });
  }

}
