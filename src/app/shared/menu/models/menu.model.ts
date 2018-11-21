import { UserRole } from '../../permissions/models/permission.models';

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
    forRoles: [UserRole.COACH, UserRole.ADMIN, UserRole.DEVELOPER]
  },
  {
    label: 'Управление Категориями',
    link: '#',
    forRoles: [UserRole.ADMIN, UserRole.DEVELOPER]
  },
  {
    label: 'История',
    link: '#',
    forRoles: ALL_ROLES
  },
  {
    label: 'Профайл',
    link: '#',
    forRoles: ALL_ROLES
  }
];
