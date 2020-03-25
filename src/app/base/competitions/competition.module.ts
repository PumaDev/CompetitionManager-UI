import {CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule} from '@angular/core';
import {CompetitionsListComponent} from './components/competitions-list/competitions-list.component';
import {CompetitionItemComponent} from './components/competitions-list/competition-item/competition-item.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {CompetitionsPageComponent} from './components/competitions-page/competitions-page.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule,
  MatTabsModule,
  MatDividerModule,
  MatExpansionModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewCompetitionsComponent} from './components/new-competition/new-competitions.component';
import {NewCompetitionCanActivate} from './security/new-competition.can-activate';
import {NewCompetitionSmartComponent} from './components/new-competition/new-competition.smart.component';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {AddCategoriesModalComponent} from './components/new-competition/add-categories-modal/add-categories.modal.component';
import {AddCategoriesModalSmartComponent} from './components/new-competition/add-categories-modal/add-categories.modal.smart.component';
import {CategoriesManagerComponent} from './components/categories-manager/categories-manager.component';
import {CategoriesListComponent} from './components/categories-manager/categories-list/categories-list.component';
import {CategoryItemComponent} from './components/categories-manager/categories-list/category-item/category-item.component';
import {CategoriesListSmartComponent} from './components/categories-manager/categories-list/categories-list.smart.component';
import {AuthModule} from '../../auth/auth.module';
import {AdminAndDeveloperCanActivate} from '../../auth/can-activate/admin-and-developer.can-activate';
import {AgeCategoryPipe} from './pipes/age-category.pipe';
import {WeightCategoryFormatterPipe} from './pipes/weight-category-formatter.pipe';
import {ExperienceCategoryFormatterPipe} from './pipes/expierience-category-formatter.pipe';
import {CreateCategoryPageComponent} from './components/categories-manager/create-category-page/create-category-page.component';
import {CreateCategoryPageSmartComponent} from './components/categories-manager/create-category-page/create-category-page.smart.component';
import {CompetitionDetailsComponent} from './components/competition-page/competition-details/competition-details.component';
import {CompetitionDetailsSmartComponent} from './components/competition-page/competition-details/competition-details.smart.component';
import {CompetitionPageComponent} from './components/competition-page/competition-page.component';
import {CompetitionPageCategoriesListComponent} from './components/competition-page/competition-page-categories-section/competition-page-categories-list.component';
import {CompetitionPageSportsmenSectionComponent} from './components/competition-page/competition-page-sportsmen-section/competition-page-sportsmen-section.component';
import {CompetitionPageSportsmenSectionSmartComponent} from './components/competition-page/competition-page-sportsmen-section/competition-page-sportsmen-section.smart.component';
import {competitionServices} from './service';
import {CompetitionPageCategoriesListSmartComponent} from './components/competition-page/competition-page-categories-section/competition-page-categories-list.smart.component';
import {MalePipe} from './pipes/male.pipe';
import {CompetitionRegistrationStatusManagerComponent} from './components/competition-registration-status-manager/competition-registration-status-manager.component';
import {CompetitionRegistrationStatusManagerSmartComponent} from './components/competition-registration-status-manager/competition-registration-status-manager.smart.component';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {MarkdownModule} from 'ngx-markdown';
import {RouterModule} from '@angular/router';
import { AttachmentsSectionComponent } from './components/attachments/attachments-section/attachments-section.component';
import { AttachmentsSectionSmartComponent } from './components/attachments/attachments-section/attachments-section-smart.component';
import { AttachmentItemComponent } from './components/attachments/attachment-item/attachment-item.component';
import { CreateAttachmentModalComponent } from './components/attachments/create-attachment-modal/create-attachment-modal.component';
import {CreateAttachmentModalSmartComponent} from './components/attachments/create-attachment-modal/create-attachment-modal.smart.component';
import { CompetitionItemDesctopComponent } from './components/competitions-list/competition-item/desctop/competition-item.desctop.component';
import { CompetitionItemMobileComponent } from './components/competitions-list/competition-item/mobile/competition-item.mobile.component';
import { CompetitionPageDesctopComponent } from './components/competition-page/desctop/competition-page.desctop.component';
import { CompetitionPageMobileComponent } from './components/competition-page/mobile/competition-page.mobile.component';
import { CompetitionDetailsMobileComponent } from './components/competition-page/competition-details/mobile/competition-details.mobile.component';
import { CompetitionPageSportsmenSectionMobileComponent } from './components/competition-page/competition-page-sportsmen-section/mobile/competition-page-sportsmen-section.mobile.component';
import { NewCompetitionsMobileComponent } from './components/new-competition/mobile/new-competitions.mobile.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AuthModule,
    PaginatorModule,

    MarkdownModule.forChild(),

    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule,
    MatDividerModule,
    MatExpansionModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CompetitionsListComponent,
    CompetitionsPageComponent,
    NewCompetitionSmartComponent
  ],
  declarations: [
    // Components
    CompetitionsListComponent,
    CompetitionItemComponent,
    CompetitionItemDesctopComponent,
    CompetitionItemMobileComponent,
    CompetitionsPageComponent,
    NewCompetitionsComponent,
    NewCompetitionsMobileComponent,
    NewCompetitionSmartComponent,
    AddCategoriesModalComponent,
    CategoriesManagerComponent,
    CategoriesListComponent,
    CategoryItemComponent,
    CategoriesListSmartComponent,
    CompetitionDetailsSmartComponent,
    CompetitionPageSportsmenSectionSmartComponent,
    CreateCategoryPageComponent,
    CompetitionDetailsComponent,
    CompetitionDetailsMobileComponent,
    CompetitionPageComponent,
    CompetitionPageDesctopComponent,
    CompetitionPageMobileComponent,
    CompetitionPageCategoriesListComponent,
    CompetitionPageSportsmenSectionComponent,
    CompetitionPageSportsmenSectionMobileComponent,
    CompetitionPageCategoriesListSmartComponent,
    CompetitionRegistrationStatusManagerComponent,
    CompetitionRegistrationStatusManagerSmartComponent,
    AttachmentsSectionComponent,
    AttachmentsSectionSmartComponent,
    AttachmentItemComponent,
    CreateAttachmentModalComponent,

    // Modals
    AddCategoriesModalSmartComponent,
    CreateCategoryPageSmartComponent,
    CreateAttachmentModalSmartComponent,

    // Pipes
    AgeCategoryPipe,
    WeightCategoryFormatterPipe,
    ExperienceCategoryFormatterPipe,
    MalePipe
  ],
  providers: [
    ...competitionServices,
    NewCompetitionCanActivate,
    AdminAndDeveloperCanActivate,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CompetitionPageSportsmenSectionComponent),
    }
  ],
  entryComponents: [
    AddCategoriesModalSmartComponent,
    CreateCategoryPageSmartComponent,
    CreateAttachmentModalSmartComponent
  ]
})
export class CompetitionModule {
}
