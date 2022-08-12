import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeFull } from '@js-camp/core/models/animeFull';
import { Observable, map, switchMap } from 'rxjs';

import { Studio } from '@js-camp/core/models/studio';
import { Genre } from '@js-camp/core/models/genre';

import { ANIME_ID_ROUTE_PARAM } from '../anime.module';

import { AnimeService } from '../../../../core/services/anime/anime.service';

/** Page with information about anime. */
@Component({
  selector: 'camp-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {

  /** Separator. */
  public separator = ' ';

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

  /**
   * Join array studios or genres separated by spaces.
   * @param array Array studios or genres.
   */
  public joinSeparatedBySpace(array: Studio[] | Genre[]): string {
    return array.map(element => element.name).join(this.separator);
  }
}
