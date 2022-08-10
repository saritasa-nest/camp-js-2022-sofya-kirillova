import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeFull } from '@js-camp/core/models/animeFull';
import { Observable, map, switchMap } from 'rxjs';

import { ANIME_ID_ROUTE_PARAM } from '../anime.module';

import { AnimeService } from './../../../../core/services/anime.service';

/** Page with information about anime. */
@Component({
  selector: 'camp-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {

  /** Anime information. */
  public readonly anime$: Observable<AnimeFull>;

  public constructor(
    route: ActivatedRoute,
    animeService: AnimeService,
  ) {
    const animeId$ = route.paramMap.pipe(
      map(params => Number(params.get(ANIME_ID_ROUTE_PARAM))),
    );
    this.anime$ = animeId$.pipe(
      switchMap(id => animeService.fetchAnimeById(id)),
    );
  }

}
