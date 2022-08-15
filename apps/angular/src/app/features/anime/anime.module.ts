import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

// import { SelectAutocompleteModule } from 'mat-select-autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';

import { FormatDatePipe } from './../../../shared/pipes/format-date.pipe';

import { UnauthorizedGuard } from './../../../core/guards/unauthorized.guard';

import { AnimeComponent } from './anime.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { DialogAddStudioComponent, EditAnimeComponent, DialogAddGenreComponent } from './edit-anime/edit-anime.component';

export const ANIME_ID_ROUTE_PARAM = 'animeId';

const routes: Routes = [
  { path: '', component: EditAnimeComponent },

  { path: 'ani', component: AnimeComponent },
  {
    path: `:${ANIME_ID_ROUTE_PARAM}`,
    canActivate: [UnauthorizedGuard],
    component: AnimeDetailsComponent,
  },
  {
    path: `:${ANIME_ID_ROUTE_PARAM}/edit`,
    canActivate: [UnauthorizedGuard],
    component: EditAnimeComponent,
  },
];

/** Anime module. */
@NgModule({
  declarations: [
    AnimeComponent,
    FormatDatePipe,
    AnimeDetailsComponent,
    EditAnimeComponent,
    DialogAddStudioComponent,
    DialogAddGenreComponent,
  ],
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
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    ScrollingModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,

  ],
})
export class AnimeModule {}
