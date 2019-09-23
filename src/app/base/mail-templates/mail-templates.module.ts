import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTemplatesPageComponent } from './components/mail-templates-page/mail-templates-page.component';
import {MailTemplatesPageSmartComponent} from './components/mail-templates-page/mail-templates-page.smart.component';
import {MailTemplatesActions} from './actions';
import {MailTemplatesService} from './services/mail-templates.service';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { CreateMailTemplateModalComponent } from './components/create-mail-template-modal/create-mail-template-modal.component';
import { UpdateMailTemplateModalComponent } from './components/update-mail-template-modal/update-mail-template-modal.component';
import {UpdateMailTemplateModalSmartComponent} from './components/update-mail-template-modal/update-mail-template-modal.smart.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateMailTemplateOnlyTemplateBodyComponent } from './components/update-mail-template-modal/update-mail-template-only-template-body/update-mail-template-only-template-body.component';
import { UpdateFullMailTemplateBodyComponent } from './components/update-mail-template-modal/update-full-mail-template-body/update-full-mail-template-body.component';

@NgModule({
  declarations: [
    MailTemplatesPageComponent,
    MailTemplatesPageSmartComponent,
    CreateMailTemplateModalComponent,
    UpdateMailTemplateModalComponent,
    UpdateMailTemplateModalSmartComponent,
    UpdateMailTemplateOnlyTemplateBodyComponent,
    UpdateFullMailTemplateBodyComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    MailTemplatesActions,
    MailTemplatesService
  ],
  entryComponents: [
    UpdateMailTemplateModalSmartComponent,
  ]
})
export class MailTemplatesModule { }
