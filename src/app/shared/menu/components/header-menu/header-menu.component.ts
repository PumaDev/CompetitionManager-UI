import { Component, OnInit } from '@angular/core';
import { MenuItem, menuItems } from '../../models/menu.model';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  menuItems: MenuItem[] = menuItems;

  constructor() { }

  ngOnInit() {
  }

}
