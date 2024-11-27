import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../Models/product';
import { Router } from '@angular/router';
import { environment } from '../../Environments/environment';
import { Category } from '../../Models/category';
import { CategoryService } from '../../service/category.service';
import { isPlatformBrowser } from '@angular/common';

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
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePage: number[] = [];

  constructor(private productService: ProductService, 
              private categoryService: CategoryService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object
            ) { }

  ngOnInit() {
    this.getCategories(this.currentPage, this.itemsPerPage);
    this.getProducts(this.keyword, this.selectCategoryId, this.currentPage, this.itemsPerPage);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('idP', '0');
    }
  }

  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      complete: () => {
      },
      error: (err: any) => {
        console.error('Error getting categories: ', err);
      }
    });
  }

  getProducts(keyword: string, selectCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectCategoryId, page, limit).subscribe({
      next: (response: any) => {
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
      },
      error: (err: any) => {
        console.error('Error getting products: ', err);
      }
    });
  }

  onPageChange(page: number) {
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
    this.currentPage = 0;
    this.itemsPerPage = 10;
    this.getProducts(this.keyword, this.selectCategoryId, this.currentPage, this.itemsPerPage);
  }

  onProductClick(productId: number){
    this.router.navigate(['/products', productId]);
  }
}
