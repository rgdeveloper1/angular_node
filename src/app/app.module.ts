import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoaderComponent } from './loader/loader.component';
import { LoderService } from './loader/loder.service';
import { Interceptor } from './loader/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoderService,  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
