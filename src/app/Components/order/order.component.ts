import { Component } from '@angular/core';
import { environment } from '../../Environments/environment';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../Models/product';
import { OrderDTO } from '../../DTOs/order/order.DTO';
import { OrderService } from '../../service/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { VNPayService } from '../../service/vnpay.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orderForm: FormGroup;
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 0,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: [],
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private tokenServe: TokenService,
    private router: Router,
    private vnpayService: VNPayService
  ) {
    this.orderForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
      note: [''],
      shipping_method: ['express'],
      payment_method: ['cod'],
      coupon_code: ''
    });
  }

  ngOnInit(): void {
    this.orderData.user_id = this.tokenServe.getUserId()!;

    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    if (productIds.length === 0) {
      return;
    }

    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
      },
      complete: () => {
        debugger
        this.calculateTotalAmount();
      },
      error: (err: any) => {
        console.error('Error getting products: ', err);
      }
    });
    this.calculateTotalAmount();
  }

  placeOrder() {
    if (this.orderForm.valid) {
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      }
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      this.orderData.total_money = this.totalAmount;
      //set gia tri cua orderForm cho orderData VD:orderData.fullname = orderForm.get('fullname)!.value

      if (this.orderData.payment_method.toLowerCase() === 'online') {
        this.vnpayService.getVNPayUrl(this.orderData).subscribe({
          next: (response: any) => {
            debugger;
            window.location.href = response.data.paymentUrl;
          },
          error: (err: any) => {
            debugger;
            console.error('Error getting : ', err);
          }
        });
      }
      else {
        this.orderService.placeOrder(this.orderData).subscribe({
          next: (response: any) => {
            debugger;
            window.alert('Đặt hàng thành công !!');
            this.cartService.clearCart();
            this.router.navigate(['']);
          },
          // complete: () => {
          //   debugger;
          //   this.calculateTotalAmount();
          // },
          error: (err: any) => {
            debugger
            console.error('Error getting : ', err);
          }
        });
      }
    }
    else {
      window.alert('Bạn không được nhập thiếu thông tin');
    }
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.cartItems.forEach(item => {
      this.totalAmount += item.product.price * item.quantity * 10000;
    });
  }

  applyCoupon(): void {
    // Apply coupon logic here
  }

  removeFromCart(id: number): void {
    this.cartService.deleteById(id);
    window.location.reload();
  }
}
