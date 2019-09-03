import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../../../shared/permissions/models/permission.models';

@Injectable()
export class NewCompetitionCanActivate implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = JSON.parse(localStorage.getItem('user')).userRole;
    return userRole === UserRole.ADMIN;
  }

}
