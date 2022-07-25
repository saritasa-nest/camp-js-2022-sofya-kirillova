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
  public displayedColumns: string[] = ['image', 'titleEnglish', 'type', 'status', 'airingStart'];

  /** Data for a table with anime.  */
  public animeTable$: Observable<readonly Anime[]>;

  public constructor(
    private animeServer: AnimeService,
  ) {
    this.animeTable$ = this.animeServer.getAnime();
  }

  /**
   * The function formats date to 'dd.mm.yyyy' or 'no date'.
   * @param date Date.
   */
  public wrapperFormatDate(date: Date | null): string {
    return formatDate(date);
  }
}
