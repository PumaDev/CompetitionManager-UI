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
  MatGridListModule,
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

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,

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
    FormsModule
  ],
  exports: [
    CompetitionsListComponent,
    CompetitionsPageComponent,
    NewCompetitionSmartComponent
  ],
  declarations: [
    CompetitionsListComponent,
    CompetitionItemComponent,
    CompetitionsPageComponent,
    NewCompetitionsComponent,
    NewCompetitionSmartComponent,
    AddCategoriesModalComponent,
    AddCategoriesModalSmartComponent
  ],
  providers: [
    CompetitionsService,
    CompetitionCategoriesService,
    NewCompetitionCanActivate
  ],
  entryComponents: [
    AddCategoriesModalSmartComponent
  ]
})
export class CompetitionModule {
}
