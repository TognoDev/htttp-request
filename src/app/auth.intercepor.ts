import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){

    const modReq = req.clone({headers: req.headers.append('Auth', 'xyz')});
    return next.handle(modReq);
  }
}
