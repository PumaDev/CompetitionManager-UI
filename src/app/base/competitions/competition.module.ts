import { NgModule } from '@angular/core';
import { CompetitionsListComponent } from './components/competitions-list/competitions-list.component';
import { CompetitionItemComponent } from './components/competitions-list/competition-item/competition-item.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CompetitionsPageComponent } from './components/competitions-page/competitions-page.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompetitionsService } from './service/competitions.service';
import { NewCompetitionsComponent } from './components/new-competition/new-competitions.component';
import { NewCompetitionCanActivate } from './security/new-competition.can-activate';
import { NewCompetitionSmartComponent } from './components/new-competition/new-competition.smart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoriesModalComponent } from './components/new-competition/add-categories-modal/add-categories.modal.component';
import { AddCategoriesModalSmartComponent } from './components/new-competition/add-categories-modal/add-categories.modal.smart.component';
import { CompetitionCategoriesService } from './service/categories.service';
import { CategoriesManagerComponent } from './components/categories-manager/categories-manager.component';
import { CategoriesListComponent } from './components/categories-manager/categories-list/categories-list.component';
import { CategoryItemComponent } from './components/categories-manager/categories-list/category-item/category-item.component';
import { CategoriesListSmartComponent } from './components/categories-manager/categories-list/categories-list.smart.component';
import { AuthModule } from '../../auth/auth.module';
import { AdminAndDeveloperCanActivate } from '../../auth/can-activate/admin-and-developer.can-activate';
import { AgeCategoryPipe } from './pipes/age-category.pipe';
import { WeightCategoryFormatterPipe } from './pipes/weight-category-formatter.pipe';
import { ExperienceCategoryFormatterPipe } from './pipes/expierience-category-formatter.pipe';
import { CreateCategoryPageComponent } from './components/categories-manager/create-category-page/create-category-page.component';
import { CreateCategoryPageSmartComponent } from './components/categories-manager/create-category-page/create-category-page.smart.component';
import { CompetitionDetailsComponent } from './components/competition-page/competition-details/competition-details.component';
import { CompetitionDetailsSmartComponent } from './components/competition-page/competition-details/competition-details.smart.component';
import { CompetitionPageComponent } from './components/competition-page/competition-page.component';
import { CompetitionPageCategoriesListComponent } from './components/competition-page/competition-page-categories-section/competition-page-categories-list.component';
import { CompetitionPageSportsmenSectionComponent } from './components/competition-page/competition-page-sportsmen-section/competition-page-sportsmen-section.component';
import { CompetitionPageSportsmenSectionSmartComponent } from './components/competition-page/competition-page-sportsmen-section/competition-page-sportsmen-section.smart.component';
import { competitionServices } from './service';
import { DeleteSportsmanFromLisModalDialog } from './components/competition-page/competition-page-sportsmen-section/delete-modal/delete-modal.component';
import { CompetitionPageCategoriesListSmartComponent } from './components/competition-page/competition-page-categories-section/competition-page-categories-list.smart.component';
import { PaginatorComponent } from './components/competition-page/competition-page-categories-section/paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AuthModule,

    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatFormFieldModule,
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
    MatIconModule
  ],
  exports: [
    CompetitionsListComponent,
    CompetitionsPageComponent,
    NewCompetitionSmartComponent
  ],
  declarations: [
    // Components
    CompetitionsListComponent,
    CompetitionItemComponent,
    CompetitionsPageComponent,
    NewCompetitionsComponent,
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
    CompetitionPageComponent,
    CompetitionPageCategoriesListComponent,
    CompetitionPageSportsmenSectionComponent,
    CompetitionPageCategoriesListSmartComponent,
    PaginatorComponent,

    // Modals
    AddCategoriesModalSmartComponent,
    CreateCategoryPageSmartComponent,
    DeleteSportsmanFromLisModalDialog,

    // Pipes
    AgeCategoryPipe,
    WeightCategoryFormatterPipe,
    ExperienceCategoryFormatterPipe
  ],
  providers: [
    ...competitionServices,
    NewCompetitionCanActivate,
    AdminAndDeveloperCanActivate
  ],
  entryComponents: [
    AddCategoriesModalSmartComponent,
    CreateCategoryPageSmartComponent,
    DeleteSportsmanFromLisModalDialog
  ]
})
export class CompetitionModule {
}
