import { formatDate } from '@js-camp/core/utils/formatDate';
import { Component } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

import { AnimeService } from './../../../core/services/anime.service';

/** Anime Component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})

export class AnimeComponent {
  /** Displayed columns. */
  public readonly displayedColumns = ['image', 'title', 'type', 'status', 'airingStart'] as const;

  /** Data for a table with anime.  */
  public readonly animeTable$: Observable<readonly Anime[]>;

  public constructor(private readonly animeServer: AnimeService) {
    this.animeTable$ = this.animeServer.getAnime();
  }

  /**
   * Function to track anime.
   * @param _index Index.
   * @param anime Anime to track.
   */
  public trackAnime(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }

  /**
   * The function formats date to 'dd.mm.yyyy' or 'no date'.
   * @param date Date.
   */
  public wrapperFormatDate(date: Date | null): string {
    return formatDate(date);
  }
}
