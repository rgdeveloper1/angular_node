import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: 'product', component: ProductsListComponent
  },
  {
    path: '', redirectTo: '/product', pathMatch:'full'
  },
  {
    path: 'product/edit/:id', component: ProductsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
