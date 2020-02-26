import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    } else {
      const token = this.authService.getToken();
      let cloned: HttpRequest<any> = req;
      if (token && token.length > 0) {
        cloned = req.clone({
          headers: req.headers
            .set(`Authorization`, `Bearer ${token}`)
            .set('Content-Type', 'application/json')
        });
      }
      return next.handle(cloned).pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.logout();
          }
        }
        return throwError(err);
      })
      );
    }



  }
}
