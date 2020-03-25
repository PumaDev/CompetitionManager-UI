import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '../../auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule,
  MatNativeDateModule, MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAndDeveloperCanActivate } from '../../auth/can-activate/admin-and-developer.can-activate';
import { usersServices } from './service';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersListSmartComponent } from './components/users-list/users-list.smart.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfilePageSmartComponent } from './components/profile-page/profile-page.smart.component';
import { ProfilePageMobileComponent } from './components/profile-page/mobile/profile-page.mobile.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AuthModule,

    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule

  ],
  providers: [
    ...usersServices,
    AdminAndDeveloperCanActivate
  ],
  declarations: [
    UsersListComponent,
    UsersListSmartComponent,
    ProfilePageComponent,
    ProfilePageMobileComponent,
    ProfilePageSmartComponent
  ]
})
export class UserModule {

}
