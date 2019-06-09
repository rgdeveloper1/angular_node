import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouteGuard } from './service/route.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path: 'product', component: ProductsListComponent,
    canActivate: [RouteGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch:'full'
  },
  {
    path: 'product/edit/:id', component: ProductsListComponent,
        canActivate: [RouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
