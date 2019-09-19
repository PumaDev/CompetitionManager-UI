import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTemplatesPageComponent } from './components/mail-templates-page/mail-templates-page.component';
import {MailTemplatesPageSmartComponent} from './components/mail-templates-page/mail-templates-page.smart.component';
import {MailTemplatesActions} from './actions';
import {MailTemplatesService} from './services/mail-templates.service';

@NgModule({
  declarations: [
    MailTemplatesPageComponent,
    MailTemplatesPageSmartComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    MailTemplatesActions,
    MailTemplatesService
  ]
})
export class MailTemplatesModule { }
