import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MatTableModule,
  ],
})
export class AnimeModule { }
