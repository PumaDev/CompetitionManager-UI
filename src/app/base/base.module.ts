import { NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { WelcomeModule } from './welcome/welcome.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompetitionModule } from './competitions/competition.module';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanActivateBasePage } from './base.can-activate';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    WelcomeModule,
    CompetitionModule,
    RouterModule,
    SharedModule,
    AuthModule,

    BrowserAnimationsModule,
    MatTabsModule
  ],
  declarations: [
    BaseComponent
  ],
  providers: [
    CanActivateBasePage
  ]
})
export class BaseModule {
}
