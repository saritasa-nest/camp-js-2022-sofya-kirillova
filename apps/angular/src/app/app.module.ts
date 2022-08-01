import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSortModule } from '@angular/material/sort';

import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DatePipe } from '@angular/common';

import { httpInterceptorProviders } from '../core/interceptors/httpInterceptorProviders';

import { FormatDatePipe } from '../shared/pipes/formatDate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeComponent } from './features/anime/anime.component';

/** App module. */
@NgModule({
  declarations: [AppComponent, AnimeComponent, FormatDatePipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  providers: [httpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
