import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { OrderComponent } from './Components/order/order.component';
import { RegisterComponent } from './Components/register/register.component';
import { OrderConfirmComponent } from './Components/order-confirm/order-confirm.component';
import { DetailProductComponent } from './Components/detail-product/detail-product.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './Components/admin/admin.component';
import { OrderAdminComponent } from './Components/admin/order-admin/order-admin.component';
import { ProductAdminComponent } from './Components/admin/product-admin/product-admin.component';
import { UserAdminComponent } from './Components/admin/user-admin/user-admin.component';

@NgModule({
  declarations: [ 
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    OrderComponent,
    RegisterComponent,
    OrderConfirmComponent,
    DetailProductComponent,
    AppComponent,
    AdminComponent,
    OrderAdminComponent,
    ProductAdminComponent,
    UserAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // HttpClientModule,
    ReactiveFormsModule,
    NgbPopoverModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
