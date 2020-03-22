import { Component } from '@angular/core';
import { LoginDesctopComponent } from '../desctop/login.desctop.component';

@Component({
    selector: 'app-login-mobile',
    templateUrl: '../desctop/login.desctop.component.html',
    styleUrls: ['../desctop/login.desctop.component.css', './login.mobile.component.css']
})
export class LoginMobileComponent extends LoginDesctopComponent {
}