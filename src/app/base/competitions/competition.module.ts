import { NgModule } from '@angular/core';
import { CompetitionsListComponent } from './components/competitions-list/competitions-list.component';
import { CompetitionItemComponent } from './components/competitions-list/competition-item/competition-item.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CompetitionsPageComponent } from './components/competitions-page/competitions-page.component';
import { MatCardModule, MatChipsModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompetitionsService } from './service/competitions.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,

    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule
  ],
  exports: [
    CompetitionsListComponent,
    CompetitionsPageComponent
  ],
  declarations: [
    CompetitionsListComponent,
    CompetitionItemComponent,
    CompetitionsPageComponent
  ],
  providers: [
    CompetitionsService
  ]
})
export class CompetitionModule {
}
