import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegisterDTO } from '../../DTOs/user/register.DTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  phone: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccept: boolean;
  dateOfBirth: Date;

  constructor(private router: Router, private userService: UserService) {
    this.phone = '';
    this.address = '';
    this.retypePassword = '';
    this.password = '';
    this.fullName = '';
    this.isAccept = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }

  register() {
    debugger
    const registerData:RegisterDTO = {      
      "phone_number": this.phone,
      "password": this.password,
      "retype_password": this.retypePassword,
      "fullname": this.fullName,
      "address": this.address,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    
    this.userService.register(registerData)
    .subscribe({
      next: (response: any) => {
        debugger;
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger;
      },
      error: (err: any) => {
        debugger
        alert(`Can not register ${err.error}`)
      }
    });
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDay = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDay.getFullYear();
      const monthDiff = today.getMonth() - birthDay.getMonth();
      
      if (monthDiff < 0 || (monthDiff == 0 && today.getDate() < birthDay.getDate())) {
        age--;
      }

      if (this.registerForm && this.registerForm.form.controls['dateOfBirth']) {
        if (age < 18) {
          this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
        } else {
          this.registerForm.form.controls['dateOfBirth'].setErrors(null);
        }
      }
    }
  }
}
