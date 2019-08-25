import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material';
import {paginatorComponents} from './component';

@NgModule({
  imports: [
    CommonModule,

    // Angular Material
    MatButtonModule
  ],
  exports: [
    paginatorComponents
  ],
  declarations: [
    paginatorComponents
  ]
})
export class PaginatorModule {
}
