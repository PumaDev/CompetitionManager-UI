import { Component } from '@angular/core';
import { isMobileVersion } from 'src/app/shared/screen-state/mobile.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isMobile(): boolean {
    return isMobileVersion();
  }
}
