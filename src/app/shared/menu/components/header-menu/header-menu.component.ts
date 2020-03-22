import {Component} from '@angular/core';
import { isMobileVersion } from 'src/app/shared/screen-state/mobile.state';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent {

  readonly isMobile: boolean = isMobileVersion();
}
