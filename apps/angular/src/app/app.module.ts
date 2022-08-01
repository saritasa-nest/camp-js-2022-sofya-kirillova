import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DatePipe } from '@angular/common';

import { httpInterceptorProviders } from '../core/interceptors/httpInterceptorProviders';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
  ],
  providers: [httpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
