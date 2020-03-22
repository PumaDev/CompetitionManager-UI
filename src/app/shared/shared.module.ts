import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatGridListModule, MatMenuModule, MatIconModule} from '@angular/material';
import {HeaderMenuComponent} from './menu/components/header-menu/header-menu.component';
import {FooterComponent} from './footer/components/footer/footer.component';
import {RouterModule} from '@angular/router';
import { HeaderMenuDesctopComponent } from './menu/components/header-menu/desctop/header-menu.desctop.component';
import { HeaderMenuMobileComponent } from './menu/components/header-menu/mobile/header-menu.mobile.component';

@NgModule({
  imports: [
    CommonModule,
    // Angular Material
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [
    HeaderMenuComponent,
    HeaderMenuDesctopComponent,
    HeaderMenuMobileComponent,
    FooterComponent
  ],
  declarations: [
    HeaderMenuComponent,
    HeaderMenuDesctopComponent,
    HeaderMenuMobileComponent,
    FooterComponent
  ]
})
export class SharedModule {
}
