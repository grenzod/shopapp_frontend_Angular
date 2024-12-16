import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../Responses/userResponse';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss'
})
export class UserAdminComponent implements OnInit {
  keyword: string = '';
  users: UserResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePage: number[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }

  getUsers(keyword: string, page: number, limit: number) {
    this.userService.getUsers(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.users = response.users;
        this.totalPages = response.total;
        this.visiblePage = this.generateVisiblePage(this.currentPage, this.totalPages);
      },
      complete: () => {
      },
      error: (err: any) => {
        console.error('Error getting products: ', err);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePage(currentPage: number, totalPages: number): number[] {
    const maxVisiblePage = 5;
    const halfVisiblePage = Math.floor(maxVisiblePage / 2);
  
    let startPage = Math.max(currentPage - halfVisiblePage, 0);
    let endPage = Math.min(startPage + maxVisiblePage - 1, totalPages);
  
    if (endPage - startPage + 1 < maxVisiblePage) {
      startPage = Math.max(endPage - maxVisiblePage + 1, 0);
    }
  
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
  
  onSearchUsers() {
    this.currentPage = 0;
    this.itemsPerPage = 10;
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (response: UserResponse) => {
        window.alert('Xóa thành công ' + response.full_name);
        window.location.reload();
      },
      complete: () => {
      },
      error: (err: any) => {
        console.error('Error getting products: ', err);
      }
    });
  }
}
