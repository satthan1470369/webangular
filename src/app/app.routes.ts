import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ProductComponent } from './pages/product.component';
import { CartComponent } from './pages/cart.component';
import { RegisterComponent } from './pages/register.component';
import { LoginComponent } from './pages/login.component';
import { AdminComponent } from './pages/admin.component';
import { PaymentComponent } from './pages/payment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path:'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart/payment', component: PaymentComponent }
];
