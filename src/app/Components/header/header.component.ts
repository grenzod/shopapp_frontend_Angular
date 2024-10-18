import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../Responses/userResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let userResponse = this.userService.getUserResponse();
    if (userResponse) {
      this.userResponse = userResponse;
    }
  }

}
