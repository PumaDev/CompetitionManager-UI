import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatMenuModule } from '@angular/material';
import { HeaderMenuComponent } from './menu/components/header-menu/header-menu.component';
import { FooterComponent } from './footer/components/footer/footer.component';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    // Angular Material
    MatButtonModule,
    MatMenuModule,
    MatCardModule
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
export class SharedModule { }
