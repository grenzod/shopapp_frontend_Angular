import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../DTOs/user/register.DTO';
import { LoginDTO } from '../DTOs/user/login.DTO';
import { environment } from '../Environments/environment';
import { UserResponse } from '../Responses/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/users`;
  constructor(private http: HttpClient) {

  }

  private createHeaders():HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi'
    });
  }
   register(registerData: RegisterDTO):Observable<any>{
    return this.http.post(this.apiUrl + "/register", registerData, {headers:this.createHeaders()});
   }

   login(loginData: LoginDTO):Observable<any>{
    return this.http.post(this.apiUrl + "/login", loginData, {headers:this.createHeaders()});
   }

   getUserDetail(token: string):Observable<any>{
    return this.http.post(this.apiUrl + "/details", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    });
   }

   saveUserResponse(userResponse?: UserResponse): void{
    try{
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);

      console.log("save userResponse success");
    }
    catch (error){  
      console.error("Have error when save userResponse: ", error);
    }
   }

   getUserResponse(): UserResponse | null{
    const userResponseJSON = localStorage.getItem('user');
    if(userResponseJSON){
      return JSON.parse(userResponseJSON);
    }
    return null;
   }
}
