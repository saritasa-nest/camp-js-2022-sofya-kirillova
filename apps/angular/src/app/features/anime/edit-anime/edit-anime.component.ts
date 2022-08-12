import { map, Observable, startWith, switchMap, scan, tap, merge, concat, forkJoin, reduce } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AnimeType, AnimeStatus } from '@js-camp/core/models/animeCommon';
import { AnimeSeason, AnimeSource, AnimeRating, AnimeCreate } from '@js-camp/core/models/animeFull';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';

import { GenreService } from '../../../../core/services/anime/genre.service';

import { AnimeService } from './../../../../core/services/anime/anime.service';

import { StudioService } from './../../../../core/services/anime/studio.service';

// const RELOAD_TOP_SCROLL_POSITION = 100;

interface AnimeFormControl {

  /** */
  readonly image: FormControl<string | null>;

  /** */
  readonly titleEnglish: FormControl<string | null>;

  /** */
  readonly titleJapanese: FormControl<string | null>;

  /** */
  readonly type: FormControl<AnimeType | null>;

  /** */
  readonly status: FormControl<AnimeStatus | null>;

  /** */
  readonly airingStart: FormControl<Date | null>;

  /** */
  readonly airingFinish: FormControl<Date | null>;

  /** */
  readonly season: FormControl<AnimeSeason | null>;

  /** */
  readonly source: FormControl<AnimeSource | null>;

  /** */
  readonly rating: FormControl<AnimeRating | null>;

  /** */
  readonly synopsis: FormControl<string | null>;

  /** */
  readonly airing: FormControl<boolean | null>;

  /** */
  readonly studios: FormControl<number[] | null>;

  /** */
  readonly genres: FormControl<number[] | null>;
}

/** Page for adding and editing anime. */
@Component({
  selector: 'camp-edit-anime',
  templateUrl: './edit-anime.component.html',
  styleUrls: ['./edit-anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAnimeComponent {

  /** */
  public studios: Studio[] = [];

  /** Anime types. */
  public readonly typeList: readonly AnimeType[] = Object.values(AnimeType);

  /** Anime types. */
  public readonly statusList: readonly AnimeStatus[] = Object.values(AnimeStatus);

  /** Anime season. */
  public readonly seasonList: readonly AnimeSeason[] = Object.values(AnimeSeason);

  /** Anime rating. */
  public readonly ratingList: readonly AnimeRating[] = Object.values(AnimeRating);

  /** Anime season. */
  public readonly sourceList: readonly AnimeSource[] = Object.values(AnimeSource);

  /** Anime genres. */
  public genresList$: Observable<readonly Genre[]>;

  /** Anime studios. */
  public studioList$: Observable<readonly Studio[]>;

  /** Count of anime with specified parameters. */
  public typeNextUrl: string | undefined;

  /** Count of anime with specified parameters. */
  public genreNextUrl: string | undefined;

  /** */
  public animeForm: FormGroup<AnimeFormControl>;

  /** */
  public searchStudio = new FormControl('');

  public constructor(
    private readonly genreService: GenreService,
    private readonly studioService: StudioService,
    private readonly animeService: AnimeService,
    private readonly cdr: ChangeDetectorRef,
  ) {

    this.genresList$ = this.genreService.fetchGenres(this.genreNextUrl).pipe(

      // tap(()=>{console.log(7)}),
      map(res => {
        this.genreNextUrl = res.next;
        return res.results;
      }),
      tap(() =>
        this.cdr.markForCheck()),
    );
    this.studioList$ = this.studioService.fetchStudios().pipe(
      map(res => {
        this.typeNextUrl = res.next;
        return res.results;
      }),
    );

    this.animeForm = new FormGroup<AnimeFormControl>({
      image: new FormControl(null),
      titleEnglish: new FormControl(null),
      titleJapanese: new FormControl(null),
      type: new FormControl(AnimeType.Movie, Validators.required),
      status: new FormControl(AnimeStatus.Airing, Validators.required),
      airingStart: new FormControl(null, Validators.required),
      airingFinish: new FormControl(null, Validators.required),
      season: new FormControl(AnimeSeason.Fall, Validators.required),
      source: new FormControl(AnimeSource.Book, Validators.required),
      rating: new FormControl(AnimeRating.G, Validators.required),
      synopsis: new FormControl('sdfsd', Validators.required),
      airing: new FormControl(false, Validators.required),
      studios: new FormControl(null, Validators.required),
      genres: new FormControl(null, Validators.required),
    });

    this.studioList$ = this.searchStudio.valueChanges.pipe(
      startWith(this.searchStudio.value),
      switchMap(() => {
        const search = this.searchStudio.value ?? undefined;
        return this.studioService.fetchStudios(search).pipe(
          map(res => {
            this.typeNextUrl = res.next;
            return res.results;
          }),
        );
      }),

    );
  }

  /** */
  public createAnime(): void {
    this.animeService.createAnime(this.animeForm.value as AnimeCreate).subscribe();
  }

  /**
   * Remove studio by id.
   * @param studioId Id of the deleted studio.
   */
  public removeStudio(studioId: number): void {
    const index = this.studios.findIndex(({ id }) => studioId === id);
    this.studios.splice(index, 1);
  }

  /**
   * Adds new studio in studio list.
   * @param studio New studio.
   */
  public addStudio(studio: Studio): void {
    if (this.studios.some(({ id }) => studio.id === id)) {
      return;
    }
    this.studios.push(studio);
    this.searchStudio.setValue('');
  }

  /** */
  public genreLoading(): void {
    const nextGenresList$ = this.genreService.fetchGenres(this.genreNextUrl).pipe(
      map(res => {
        this.genreNextUrl = res.next;
        return res.results;
      }),
    );

    this.genresList$ = forkJoin(
      [this.genresList$,
      nextGenresList$,]
    ).pipe(
      map(genres => genres.flat(1)),
    );
  }
}

// this.genresList$ = this.genreService.fetchGenres(this.genreNextUrl).pipe(
//   map(res => {
//     this.genreNextUrl = res.next;
//     return res.results;
//   }),
//   scan((acc, val) => [...acc, ...val], [] as Genre[]),
// );()
