import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../Responses/userResponse';
import { CartService } from '../../service/cart.service';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userResponse?: any;
  isPopoverOpen = false;
  activeNavItem: number = 2;

  constructor(private userService: UserService, 
              private cartService: CartService, 
              private tokenService: TokenService,
              private router: Router
            ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponse();
    const ans = localStorage.getItem('idP');
    if(ans != null){
      this.activeNavItem = Number(ans);
    }
    else this.activeNavItem = 0;
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
      this.setActiveNavItem(1);
    }
    if(id == 2){
      this.userService.removeUserFromLocalStorage();
      this.cartService.clearCart();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponse();
      this.router.navigate(['/']);
      this.setActiveNavItem(2);
    }
    this.isPopoverOpen = false;
  }

  setActiveNavItem(id: number){
    localStorage.setItem('idP', id.toString());
  }
}
