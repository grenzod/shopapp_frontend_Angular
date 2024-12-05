import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../Environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiGetProducts = `${environment.apiBaseUrl}/users`;

    constructor(private http: HttpClient) { }

    authenticate(loginType: 'facebook' | 'google'): Observable<string> {
        return this.http.get(`${this.apiGetProducts}/auth/social-login?login_type=${loginType}`, {responseType: 'text'});
    }

    exchangeCodeForToken(code: string, loginType: 'facebook' | 'google'): Observable<any> {
        const params = new HttpParams()
        .set('code', code)
        .set('login_type', loginType);
        return this.http.get<any>(`${this.apiGetProducts}/auth/social/callback`, {params});
    }
}