import { Injectable } from "@angular/core";
import { environment } from "../Environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../Models/category";
import { CategoryDTO } from "../DTOs/category/category.DTO";

@Injectable({ 
    providedIn: 'root' 
})
export class CategoryService {
    private apiGetProducts = `${environment.apiBaseUrl}/categories`;

    constructor(private http: HttpClient) { }

    getCategories(page: number, limit: number) :Observable<Category[]> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Category[]>(this.apiGetProducts, { params });
    }

    addCategory(category: CategoryDTO): Observable<string> {
        return this.http.post<string>(this.apiGetProducts, category);
    }
}