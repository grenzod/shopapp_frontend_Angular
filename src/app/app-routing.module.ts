import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DetailProductComponent } from './Components/detail-product/detail-product.component';
import { OrderComponent } from './Components/order/order.component';
import { OrderConfirmComponent } from './Components/order-confirm/order-confirm.component';
import { AuthGuardProvider } from './guard/auth.guard';
import { AdminComponent } from './Components/admin/admin.component';
import { AdminGuardProvider } from './guard/admin.guard';
import { OrderAdminComponent } from './Components/admin/order-admin/order-admin.component';
import { AuthCallbackComponent } from './Components/auth-callback/auth-callback.component';
import { ProductAdminComponent } from './Components/admin/product-admin/product-admin.component';
import { UserAdminComponent } from './Components/admin/user-admin/user-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id', component: DetailProductComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuardProvider] },
  { path: 'orders/:id', component: OrderConfirmComponent, canActivate: [AuthGuardProvider] },
  { path: 'auth/google/callback', component: AuthCallbackComponent },
  { path: 'auth/facebook/callback', component: AuthCallbackComponent },
  
  // Admin
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuardProvider] },
  { path: 'order-admin', component: OrderAdminComponent, canActivate: [AdminGuardProvider] },
  { path: 'product-admin', component: ProductAdminComponent, canActivate: [AdminGuardProvider] },
  { path: 'user-admin', component: UserAdminComponent, canActivate: [AdminGuardProvider] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
