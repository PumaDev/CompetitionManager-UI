import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../../shared/permissions/models/permission.models';

@Injectable()
export class AdminAndDeveloperCanActivate implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userJson: string = localStorage.getItem('user');
    if (userJson) {
      const userRole = JSON.parse(userJson).userRole;
      return userRole === UserRole.ADMIN || userRole === UserRole.DEVELOPER;
    } else {
      return false;
    }
  }

}
