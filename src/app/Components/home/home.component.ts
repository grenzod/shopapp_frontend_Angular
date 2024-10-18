import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../Models/product';
import { Router } from '@angular/router';
import { environment } from '../../Environments/environment';
import { Category } from '../../Models/category';
import { CategoryService } from '../../service/category.service';
import { TokenService } from '../../service/token.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  keyword: string = '';
  selectCategoryId: number = 0;
  products: Product[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePage: number[] = [];

  constructor(private productService: ProductService, 
              private categoryService: CategoryService,
              private router: Router,
              private tokenService: TokenService,
              private cartService: CartService
            ) { }

  ngOnInit() {
    // this.cartService.clearCart();
    // this.tokenService.removeToken();
    this.getCategories(this.currentPage, this.itemsPerPage);
    this.getProducts(this.keyword, this.selectCategoryId, this.currentPage, this.itemsPerPage);
    // this.tokenService.removeToken();
  }

  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.categories = response;
      },
      complete: () => {
        debugger
      },
      error: (err: any) => {
        console.error('Error getting categories: ', err);
      }
    });
  }

  getProducts(keyword: string, selectCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectCategoryId, page, limit).subscribe({
      next: (response: any) => {
        debugger
        response.products.forEach((product: Product) => {
          if(product.thumbnail == "") {
            product.thumbnail = "null";
          }
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.total;
        this.visiblePage = this.generateVisiblePage(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger
      },
      error: (err: any) => {
        debugger
        console.error('Error getting products: ', err);
      }
    });
  }

  onPageChange(page: number) {
    debugger
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectCategoryId, this.currentPage, this.itemsPerPage);
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
  
  onSearchProducts() {
    debugger
    this.currentPage = 0;
    this.itemsPerPage = 10;
    this.getProducts(this.keyword, this.selectCategoryId, this.currentPage, this.itemsPerPage);
  }

  onProductClick(productId: number){
    debugger
    this.router.navigate(['/products', productId]);
  }
}
