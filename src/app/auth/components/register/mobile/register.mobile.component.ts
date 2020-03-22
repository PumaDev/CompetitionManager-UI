import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../desctop/register.component';

@Component({
    selector: 'app-register-mobile',
    templateUrl: '../desctop/register.component.html',
    styleUrls: ['./register.mobile.component.css', '../desctop/register.component.css']
})
export class RegisterMobileComponent extends RegisterComponent {
}