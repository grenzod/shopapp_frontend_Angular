import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { Category } from '../../../Models/category';
import { CategoryDTO } from '../../../DTOs/category/category.DTO';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.scss'
})
export class ProductAdminComponent implements OnInit {
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  categories: Category[] = [];
  category: CategoryDTO = {
    name: ''
  };
  product: {
    name: string;
    price: number; 
    description: string;
    category_id: number;
  } = {
    name: '',
    price: 0,
    description: '',
    category_id: 0
  };
  

  ngOnInit(): void {
    this.getCategories(0, 10);
  }

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

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

  addCategory() {
    this.categoryService.addCategory(this.category!).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      complete: () => {
      },
      error: (err: any) => {
        console.error('Error adding category: ', err);
      }
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl = e.target!.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addImage(event: Event) {
    event.preventDefault();

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

    }
  }

  addProduct() {
  }
}
