import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { LoginDTO } from '../../DTOs/user/login.DTO';
import { LoginResponse } from '../../Responses/LoginResponse';
import { TokenService } from '../../service/token.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../Models/role';
import { UserResponse } from '../../Responses/userResponse';
import { CartService } from '../../service/cart.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  subject: string = '';
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
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.roleService.getRole().subscribe({
    //   next: (roles: Role[]) => {
    //     debugger
    //     this.roles = roles;
    //     this.selectedRole = roles.length > 0 ? roles[0] : undefined;
    //   },
    //   error: (error: any) => {
    //     debugger
    //     console.error('Error getting role: ', error);
    //   }
    // });
  }

  login() {
    debugger
    let phone: string = '';
    let email: string = '';
    if(this.isEmail(this.subject)) {
      email = this.subject
    }
    else {
      phone = this.subject
    }

    const loginData: LoginDTO = {
      phone_number: phone,
      email: email,
      password: this.password
    };

    this.userService.login(loginData).subscribe({
      next: (responseT: LoginResponse) => {
        debugger
        const token = responseT.token;
        if (this.remember) {
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
        window.alert(`Can not login, error: ${err.error}`);
      }
    });
  }

  isEmail(subject: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(subject);
  }

  loginWithGoogle() {
    this.authService.authenticate('google').subscribe({
      next: (url: string) => {
        debugger
        window.location.href = url;
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

  loginWithFacebook() {
    this.authService.authenticate('facebook').subscribe({
      next: (url: string) => {
        debugger
        window.location.href = url;
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
}
