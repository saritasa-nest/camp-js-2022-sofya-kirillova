import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Needed to configure automatic publication. */
const defaultLocationStrategy = { provide: LocationStrategy, useClass: PathLocationStrategy };

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/anime/anime.module').then(m => m.AnimeModule),
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [defaultLocationStrategy],
})
export class AppRoutingModule { }
