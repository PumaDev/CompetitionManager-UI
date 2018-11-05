import { RouterModule, Routes } from '@angular/router';
import { baseRoutes } from './base/base.routes';
import { NgModule } from '@angular/core';
import { authRoutes } from './auth/auth.routers';

export const routes: Routes = [
  {
    path: '',
    children: [
      ...baseRoutes,
      ...authRoutes
    ]
    // TODO: add 404 page
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
