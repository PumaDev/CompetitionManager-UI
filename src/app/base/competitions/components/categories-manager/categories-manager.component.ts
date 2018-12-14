import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateCategoryPageSmartComponent } from './create-category-page/create-category-page.smart.component';

@Component({
  selector: 'app-categories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.css']
})
export class CategoriesManagerComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openCreateCategoryModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateCategoryPageSmartComponent, dialogConfig);
  }

}
