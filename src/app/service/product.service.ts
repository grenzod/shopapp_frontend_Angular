import { Observable } from "rxjs";
import { environment } from "../Environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../Models/product";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ProductService {
    private apiGetProducts = `${environment.apiBaseUrl}/products`;

    constructor(private http: HttpClient) { }

    getProducts(keyword: string, selectCategoryId: number, page: number, limit: number): Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('categoryId', selectCategoryId.toString())
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiGetProducts, { params });
    }

    getDetailProduct(productId: number) {
        return this.http.get(`${this.apiGetProducts}/${productId}`);
    }

    getProductsByIds(productIds: number[]): Observable<Product[]> {
        const params = new HttpParams()
            .set('ids', productIds.join(','));
        return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
      }
      
}