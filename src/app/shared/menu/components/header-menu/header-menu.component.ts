import {Component, OnInit} from '@angular/core';
import {MenuItem, menuItems, userProfileMenu} from '../../models/menu.model';
import {UserRole} from '../../../permissions/models/permission.models';
import {AuthActions} from '../../../../auth/actions/auth.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.reducers';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  menuItems: MenuItem[] = menuItems;
  userProfileMenuItems: MenuItem[] = userProfileMenu;

  private _currentUserRole: UserRole;

  constructor(
    private store: Store<State>,
    private authActions: AuthActions) {
  }

  ngOnInit() {
    this._currentUserRole = JSON.parse(localStorage.getItem('user')).userRole;
  }

  canShowMenuItem(menuItem: MenuItem): boolean {
    return menuItem.forRoles.indexOf(this._currentUserRole) >= 0;
  }

  exit() {
    this.store.dispatch(this.authActions.logout());
  }

  emptyCols() {
    return 7 - 4 - menuItems.filter((item: MenuItem) => this.canShowMenuItem(item)).length;
  }
}
