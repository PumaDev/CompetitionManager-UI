import {UserRole} from '../../permissions/models/permission.models';

export interface MenuItem {
  label: string;
  link: string;
  forRoles: UserRole[];
}

export const ALL_ROLES = [UserRole.COACH, UserRole.ADMIN, UserRole.DEVELOPER];

export const menuItems: MenuItem[] = [
  {
    label: 'Новое соревнование',
    link: '/competition/new',
    forRoles: [UserRole.ADMIN]
  },
  {
    label: 'Соревнования',
    link: '/competitions',
    forRoles: ALL_ROLES
  },
  {
    label: 'Управление Категориями',
    link: '/competition-categories',
    forRoles: [UserRole.ADMIN, UserRole.DEVELOPER]
  },
  {
    label: 'Пользователи',
    link: '/users',
    forRoles: [UserRole.ADMIN, UserRole.DEVELOPER]
  },
  {
    label: 'Почта',
    link: '/mail-templates',
    forRoles: [UserRole.ADMIN, UserRole.DEVELOPER]
  }
];

export const userProfileMenu: MenuItem[] = [
  {
    label: 'Профиль',
    link: '/profile',
    forRoles: ALL_ROLES
  }
];
