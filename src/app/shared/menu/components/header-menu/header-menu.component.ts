import { Component, OnInit } from '@angular/core';
import { MenuItem, menuItems } from '../../models/menu.model';
import { Router } from '@angular/router';
import { UserRole } from '../../../permissions/models/permission.models';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  menuItems: MenuItem[] = menuItems;

  private _currentUserRole: UserRole;

  constructor(private router: Router) { }

  ngOnInit() {
    this._currentUserRole = JSON.parse(sessionStorage.getItem('user')).userRole;
  }

  canShowMenuItem(menuItem: MenuItem): boolean {
    return menuItem.forRoles.indexOf(this._currentUserRole) >= 0;
  }

  exit() {
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
