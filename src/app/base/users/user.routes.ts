import { Routes } from '@angular/router';
import { UsersListSmartComponent } from './components/users-list/users-list.smart.component';
import { AdminAndDeveloperCanActivate } from '../../auth/can-activate/admin-and-developer.can-activate';

export const userRoutes: Routes = [
  {
    path: 'users',
    component: UsersListSmartComponent,
    canActivate: [AdminAndDeveloperCanActivate]
  }
];
