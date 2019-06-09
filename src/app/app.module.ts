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
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './service/auth-service.service';
import { AuthInterceptor } from './service/auth-interceptor';
import { DataService } from './service/data.service';
import { RouteGuard } from './service/route.guard';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    LoaderComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoderService, AuthService,
    DataService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    RouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
