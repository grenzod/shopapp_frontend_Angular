import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelper = new JwtHelperService();
    private apiGetProducts = `${environment.apiBaseUrl}/users`;
    constructor(private http: HttpClient) {}

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

    getToken(): string | null {
        if (this.isBrowser()) {
            return localStorage.getItem(this.TOKEN_KEY);
        }
        return null;
    }

    setToken(token: string): void {
        if (this.isBrowser()) {
            localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    removeToken(): void {
        if (this.isBrowser()) {
            localStorage.removeItem(this.TOKEN_KEY);
        }
    }

    // getUserId(): number | null{
    //     let userObject = this.jwtHelper.decodeToken(this.getToken() ?? '');
    //     return 'userId' in userObject ? parseInt(userObject['userId']) : null;
    // }
    getUserId(): number | null {
        const token = this.getToken(); 
        if (!token) {
            return null; 
        }
        
        try {
            let userObject = this.jwtHelper.decodeToken(token);
            return userObject && 'userId' in userObject ? parseInt(userObject['userId']) : null;
        } catch (error) {
            console.error("Error decoding token: ", error); 
            return null; 
        }
    }
    
    getRoleId(): number | null {
        const token = this.getToken(); 
        if (!token) {
            return null; 
        }
        
        try {
            let userObject = this.jwtHelper.decodeToken(token);
            return userObject && 'roleId' in userObject ? userObject['roleId'] : null;
        } catch (error) {
            console.error("Error decoding token: ", error); 
            return null; 
        }
    }

    isTokenExpried(): boolean {
        if (this.getToken() == null) {
            return false;
        }
        return this.jwtHelper.isTokenExpired(this.getToken()!);
    }

    logout(): Observable<any> {
        return this.http.post<any>(`${this.apiGetProducts}/logout`, {});
    }
}
