import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoderService } from './loder.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public spinnerService: LoderService) {
    console.log(spinnerService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      this.spinnerService.show();
    return next.handle(req).pipe(tap(
            (event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                this.spinnerService.hide();
              }
            },
            (err: any) => {
      
            }
    ))
  }
}
