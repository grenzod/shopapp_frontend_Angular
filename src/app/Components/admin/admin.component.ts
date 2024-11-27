import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  adminComponent: string = 'order';

  ngOnInit(): void {

  }

  GoToComponent(component: string): void {
    this.adminComponent = component;
  }

}