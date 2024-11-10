import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DetailProductComponent } from './Components/detail-product/detail-product.component';
import { OrderComponent } from './Components/order/order.component';
import { OrderConfirmComponent } from './Components/order-confirm/order-confirm.component';
import { AuthGuardProvider } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id', component: DetailProductComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuardProvider] },
  { path: 'orders/:id', component: OrderConfirmComponent, canActivate: [AuthGuardProvider] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
