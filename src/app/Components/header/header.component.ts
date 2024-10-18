import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../Responses/userResponse';
import { CartService } from '../../service/cart.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userResponse?: any;
  isPopoverOpen = false;

  constructor(private userService: UserService, 
              private cartService: CartService, 
              private tokenService: TokenService
            ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponse();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(id: number){
    if(id == 2){
      this.userService.removeUserFromLocalStorage();
      this.cartService.clearCart();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponse();
    }
    this.isPopoverOpen = false;
  }
}
