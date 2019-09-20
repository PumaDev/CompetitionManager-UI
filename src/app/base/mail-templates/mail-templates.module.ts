import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTemplatesPageComponent } from './components/mail-templates-page/mail-templates-page.component';
import {MailTemplatesPageSmartComponent} from './components/mail-templates-page/mail-templates-page.smart.component';
import {MailTemplatesActions} from './actions';
import {MailTemplatesService} from './services/mail-templates.service';
import {MatButtonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    MailTemplatesPageComponent,
    MailTemplatesPageSmartComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule
  ],
  providers: [
    MailTemplatesActions,
    MailTemplatesService
  ]
})
export class MailTemplatesModule { }
