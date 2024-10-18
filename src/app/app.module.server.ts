import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { OrderComponent } from './Components/order/order.component';
import { RegisterComponent } from './Components/register/register.component';
import { OrderConfirmComponent } from './Components/order-confirm/order-confirm.component';
import { DetailProductComponent } from './Components/detail-product/detail-product.component';
import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
