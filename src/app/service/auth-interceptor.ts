import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { Inject } from '@angular/core';

export class AuthInterceptor implements HttpInterceptor {

    constructor( @Inject(AuthService)  private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token =localStorage.getItem('token') || 'null';
        // const token = this.authService.getToken();
        // console.log(token);
        const authReq = req.clone({
            // headers: req.headers.set('Authorization',  token)
            setHeaders: {
                'Authorization': `Bearer ${token}`,
                'DEVICE_ID': 'DEDSFSDdfdsfdssd',
                'AUTH_TOKEN': 'dfsfljdslfkjsdlkjdslkfdjslf=fdfjslfjk'
               }
        })
        return next.handle(authReq);

    }
}