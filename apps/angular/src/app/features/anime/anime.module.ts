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

import { UnauthorizedGuard } from './../../../core/guards/unauthorized.guard';

import { FormatDatePipe } from './../../../shared/pipes/formatDate';
import { AnimeComponent } from './anime.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';

export const ANIME_ID_ROUTE_PARAM = 'animeId';

const routes: Routes = [
  { path: '', component: AnimeComponent },
  {
    path: `:${ANIME_ID_ROUTE_PARAM}`,
    canActivate: [UnauthorizedGuard],
    component: AnimeDetailsComponent,
  },
];

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, FormatDatePipe, AnimeDetailsComponent],
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
