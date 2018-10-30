import { NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { WelcomeModule } from './welcome/welcome.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompetitionModule } from './competitions/competition.module';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    WelcomeModule,
    CompetitionModule,
    RouterModule,
    SharedModule,

    BrowserAnimationsModule,
    MatTabsModule
  ],
  declarations: [
    BaseComponent
  ]
})
export class BaseModule {
}
