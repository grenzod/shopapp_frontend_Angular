import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../Responses/userResponse';
import { CartService } from '../../service/cart.service';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import e from 'express';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userResponse?: any;
  isPopoverOpen = false;
  activeNavItem: number = 2;
  admin: boolean = false;

  constructor(private userService: UserService, 
              private cartService: CartService, 
              private tokenService: TokenService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object
            ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponse();
    if (isPlatformBrowser(this.platformId)) {
      const ans = localStorage.getItem('idP');
      this.activeNavItem = ans ? Number(ans) : 0;
    }
    const roleId = this.tokenService.getRoleId();
    if(roleId == 2){
      this.admin = true;
    }
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(id: number){
    if(id == 0){

    }
    if(id == 1){
      const userId = this.tokenService.getUserId();
      this.router.navigate(['/orders', userId]);
    }
    if(id == 2){
      this.userService.removeUserFromLocalStorage();
      this.cartService.clearCart();
      this.tokenService.removeToken();
      this.router.navigate(['/']);
      window.location.reload();
    }
    this.isPopoverOpen = false;
  }

  setActiveNavItem(id: number){
    localStorage.setItem('idP', id.toString());
  }
}
