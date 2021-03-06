import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {IAccessToken} from '../shared/permissions/models/permission.models';

@Injectable()
export class CanActivateBasePage implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const accessToken: IAccessToken = JSON.parse(localStorage.getItem('access-token'));
    if (accessToken) {
      if (new Date(accessToken.expiresIn).getTime() < this.getGmt0Time()) {
        localStorage.removeItem('access-token');
        localStorage.removeItem('user');
      } else {
        return true;
      }
    }

    this.router.navigate([this.authService.getLoginUrl()]);
    return false;
  }

  private getGmt0Time(): number {
    const currentDate: Date = new Date();

    return currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000;
  }

}
