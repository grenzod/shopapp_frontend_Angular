import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { LoginDTO } from '../../DTOs/user/login.DTO';
import { LoginResponse} from '../../Responses/LoginResponse';
import { TokenService } from '../../service/token.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../Models/role';
import { UserResponse } from '../../Responses/userResponse';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  phone: string = '';
  password: string = '';
  check: boolean = false;

  roles: Role[] = [];
  remember: boolean = true;
  selectedRole: Role | undefined;
  userResponse?: UserResponse

  constructor(private router: Router, 
              private userService: UserService, 
              private tokenService: TokenService, 
              private roleService: RoleService,
            ) {}

  ngOnInit(){
    debugger
    this.roleService.getRole().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.error('Error getting role: ', error);
      }
    });
  }

  login() {
    debugger

    const loginData: LoginDTO = {      
      phone_number: this.phone,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1,
    };

    this.userService.login(loginData).subscribe({
        next: (responseT: LoginResponse) => {
          debugger
          const token = responseT.token;
          if(this.remember){
            this.tokenService.setToken(token);
            this.userService.getUserDetail(token).subscribe({
              next: (response: any) => {
                debugger
                this.userResponse = {
                  ...response,
                  date_of_birth: new Date(response.date_of_birth),
                }
                this.userService.saveUserResponse(this.userResponse);
                this.router.navigate(['/']);
              },
              complete: () => {
                debugger
              },
              error: (err: any) => {
                debugger
                console.error('Error getting user detail: ', err);
              }
            })
          }
        },
        complete: () => {
          debugger;
        },
        error: (err: any) => {
          debugger
          alert(`Can not login, error: ${err.error}`);
        }
      });
  }
}
