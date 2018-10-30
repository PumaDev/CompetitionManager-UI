import { RouterModule, Routes } from '@angular/router';
import { baseRoutes } from './base/base.routes';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    children: [
      ...baseRoutes
    ]
    // TODO: add 404 page
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
