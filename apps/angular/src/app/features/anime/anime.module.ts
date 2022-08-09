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

import { UnauthorizedGuard } from '../../../core/guards/unauthorized.guard';

import { FormatDatePipe } from '../../../shared/pipes/format-date.pipe';

import { AnimeComponent } from './anime.component';
import { AnimeDetailedComponent } from './anime-detailed/anime-detailed.component';

const routes: Routes = [
  { path: '', component: AnimeComponent },
  {
    path: 'anime-detailed',
    canActivate: [UnauthorizedGuard],
    component: AnimeDetailedComponent,
  },
];

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, FormatDatePipe, AnimeDetailedComponent],
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
export class AnimeModule {}
