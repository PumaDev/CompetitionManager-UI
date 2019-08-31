import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatGridListModule, MatMenuModule} from '@angular/material';
import {HeaderMenuComponent} from './menu/components/header-menu/header-menu.component';
import {FooterComponent} from './footer/components/footer/footer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    // Angular Material
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    RouterModule
  ],
  exports: [
    HeaderMenuComponent,
    FooterComponent
  ],
  declarations: [
    HeaderMenuComponent,
    FooterComponent
  ]
})
export class SharedModule {
}
