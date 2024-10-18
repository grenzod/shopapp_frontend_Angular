import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
    private apiGetRole = `${environment.apiBaseUrl}/roles`
    constructor(private http: HttpClient){}

    getRole(): Observable<any>{
        return this.http.get<any[]>(this.apiGetRole);
    }
}
