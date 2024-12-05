import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';
import { tap, switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserResponse } from '../../Responses/userResponse';
import { LoginResponse } from '../../Responses/LoginResponse';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-auth-callback',
  template: '<div>Đang xử lý đăng nhập...</div>', // Thêm loading indicator
  standalone: true
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private processed = false; // Flag để track việc xử lý
  processedUserResponse?: UserResponse;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Kiểm tra nếu đã xử lý
    if (this.processed) {
      return;
    }

    const url = this.router.url;
    let loginType: "google" | "facebook";
  
    if (url.includes('/auth/google/callback')) {
      loginType = "google";
    } else if (url.includes('/auth/facebook/callback')) {
      loginType = "facebook";
    } else {
      console.error("Invalid URL: ", url);
      this.router.navigate(['/login'], { queryParams: { error: 'invalid_login_type' } });
      return;
    }

    // Lấy code từ URL một cách đồng bộ
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      console.error("No code found in URL");
      this.router.navigate(['/login'], { queryParams: { error: 'no_code' } });
      return;
    }

    // Đánh dấu đã xử lý
    this.processed = true;

    this.authService.exchangeCodeForToken(code, loginType).pipe(
      tap((response: LoginResponse) => {
        const token = response.token;
        this.tokenService.setToken(token);
      }),
      switchMap((response: LoginResponse) =>
        this.userService.getUserDetail(response.token)
      ),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (userResponse: any) => {
        this.processedUserResponse = {
          ...userResponse,
          date_of_birth: new Date(userResponse.date_of_birth),
        };
        this.userService.saveUserResponse(this.processedUserResponse);
        
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Error during authentication: ", err);
        this.router.navigate(['/login'], { queryParams: { error: 'authentication_failed' } });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}