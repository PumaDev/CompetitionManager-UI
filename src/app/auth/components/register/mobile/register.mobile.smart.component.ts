import { RegisterSmartComponent } from '../register.smart.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducers';
import { RegistrationActions } from 'src/app/auth/actions/register/registration.actions';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register-mobile-smart',
    templateUrl: './register.mobile.smart.component.html'
})
export class RegisterMobileSmartComponent extends RegisterSmartComponent {
    constructor(private store2: Store<State>, private registrationActions2: RegistrationActions) {
        super(store2, registrationActions2);
    }
}
