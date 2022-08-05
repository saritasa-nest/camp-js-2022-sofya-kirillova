import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';

import { FormatDatePipe } from '../../../shared/pipes/format-date.pipe';

import { AnimeComponent } from './anime.component';

const routes: Routes = [{ path: '', component: AnimeComponent }];

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, FormatDatePipe],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
})
export class AnimeModule { }
