import {Component} from '@angular/core';
import { ProfilePageComponent } from '../profile-page.component';

@Component({
  selector: 'app-profile-page-mobile',
  templateUrl: '../profile-page.component.html',
  styleUrls: ['../profile-page.component.css', './profile-page.mobile.component.css']
})
export class ProfilePageMobileComponent extends ProfilePageComponent {
}
