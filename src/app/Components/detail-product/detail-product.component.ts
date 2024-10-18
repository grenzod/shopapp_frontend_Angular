import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductService } from '../../service/product.service';
import { environment } from '../../Environments/environment';
import { ProductImage } from '../../Models/product.image';
import { CartService } from '../../service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit{
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(private productService: ProductService, 
              private cartService: CartService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    debugger
    // this.cartService.clearCart();
    // const idparam = 3;

    // if(idparam !== null){
    //   this.productId = idparam;
    // }

    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
    });

    if(!isNaN(this.productId)){
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          debugger
          if(response.product_images && response.product_images.length > 0){
            response.product_images.forEach((product_image: ProductImage) => {
              if (!product_image.imageUrl.startsWith('http')) {
                if(product_image.imageUrl == "") {
                  product_image.imageUrl = "null";
                }
                product_image.imageUrl = `${environment.apiBaseUrl}/products/images/${product_image.imageUrl}`;
              }
            });
          }

          this.product = response;
          this.showImage(0);
        },
        complete: () => {
          debugger
        },
        error: (err: any) => {
          debugger
          console.error('Error getting product: ', err);
        }
      }); 
    }
    else{
      console.error('Invalid product id: ', this.productId);
    }
  }

  showImage(id: number): void {
    debugger
    if(this.product && this.product.product_images && this.product.product_images.length > 0){
      if(id < 0){
        id = this.product.product_images.length - 1;
      }
      else if(id >= this.product.product_images.length){
        id = 0;
      }
      
      this.currentImageIndex = id;
    }
  }

  thumbnailClick(id: number): void {
    debugger
    this.currentImageIndex = id;
  }

  nextImage(): void{
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void{
    debugger
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(): void{
    debugger
    if(this.product){
      this.cartService.addToCart(this.product.id, this.quantity);
    }
    else{
      console.error("Can not add product because null !!");
    }
  }

  increaseQuantity(): void{
    this.quantity++;
  }
  decreaseQuantity(): void{
    if(this.quantity > 1) 
      this.quantity--;
  }
  buyNow(): void{

  }
}
