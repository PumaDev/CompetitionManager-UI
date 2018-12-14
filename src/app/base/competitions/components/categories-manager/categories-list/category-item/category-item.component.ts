import { Component, Input, OnInit } from '@angular/core';
import { ICompetitionCategory } from '../../../../models/category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input() category: ICompetitionCategory;

  constructor() { }

  ngOnInit() {
  }
}
