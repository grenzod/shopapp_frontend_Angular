import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<number, number> = new Map();

  constructor(private productService: ProductService) {
    if (this.isBrowser()) {
      const storeCart = localStorage.getItem('cart');
      if (storeCart) {
        this.cart = new Map(JSON.parse(storeCart));
      }
    }
  }

  addToCart(id: number, quantity: number = 1) {
    if (this.cart.has(id)) {
      this.cart.set(id, this.cart.get(id)! + quantity);
    } else {
      this.cart.set(id, quantity);
    }
    this.saveCartLocalStorage();
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  private saveCartLocalStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartLocalStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
