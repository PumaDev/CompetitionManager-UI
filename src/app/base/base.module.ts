import { NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { WelcomeModule } from './welcome/welcome.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompetitionModule } from './competitions/competition.module';
import {MatButtonModule, MatDialogModule, MatInputModule, MatTabsModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanActivateBasePage } from './base.can-activate';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from './users/user.module';
import { DeleteEntityDialog } from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  imports: [
    WelcomeModule,
    CompetitionModule,
    UserModule,
    RouterModule,
    SharedModule,
    AuthModule,

    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    BaseComponent,
    DeleteEntityDialog
  ],
  providers: [
    CanActivateBasePage
  ],
  entryComponents: [
    DeleteEntityDialog
  ]
})
export class BaseModule {
}
