import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AccessTokenHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    if (accessToken) {
      req = req.clone({headers: req.headers.set('X-Auth-Token', accessToken.token)});
    }
    return next.handle(req);
  }
}
