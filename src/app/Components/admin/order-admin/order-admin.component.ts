import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { OrderResponse } from '../../../Responses/orderResponse';
import { OrderDetail } from '../../../Models/order.detail';
import { environment } from '../../../Environments/environment';
import { get } from 'node:http';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.scss'
})
export class OrderAdminComponent implements OnInit {
  orderResponses: OrderResponse[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  visiblePage: number[] = [];
  pages: number[] = [];
  key: string = '';
  limit: number = 10;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrder(this.key, this.currentPage, this.limit);
  }

  getAllOrder(key: string, page: number, limit: number) {
    this.orderService.getOrders(key, page, limit).subscribe({
      next: (response: any) => {
        response.products.forEach((order: OrderResponse) => {
          order.order_details.forEach((order_detail: OrderDetail) => {
            if (!order_detail.product.thumbnail.startsWith('http')) {
              order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
            }
          });
          order.order_details.forEach((order_detail: OrderDetail) => {
            order.total_money += order_detail.price * order_detail.numberOfProducts;
          })
        })

        this.orderResponses = response.products;
        this.totalPages = response.total;
        this.visiblePage = this.generateVisiblePage(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger
      },
      error: (err: any) => {
        console.error('Error getting order details: ', err);
      }
    });
  }

  generateVisiblePage(currentPage: number, totalPages: number): number[] {
    const maxVisiblePage = 5;
    const halfVisiblePage = Math.floor(maxVisiblePage / 2);
  
    let startPage = Math.max(currentPage - halfVisiblePage, 0);
    let endPage = Math.min(startPage + maxVisiblePage - 1, totalPages);
  
    if (endPage - startPage + 1 < maxVisiblePage) {
      startPage = Math.max(endPage - maxVisiblePage + 1, 0);
    }
  
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllOrder(this.key, this.currentPage, this.limit);
  }
}
