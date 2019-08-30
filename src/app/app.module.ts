import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';

import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { BaseModule } from './base/base.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { reducers } from './app.reducers';
import { appEffects } from './app.effects';
import { appActions } from './app.actions';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BaseModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,

    HttpClientModule,
    // ngrx
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(appEffects),

    MarkdownModule.forRoot(),

    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [
    { provide: HttpClient, deps: [HttpHandler, /* StorageService,*/ Store /*, CustomHttpActions */] },
    HttpClient,
    ...appActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
