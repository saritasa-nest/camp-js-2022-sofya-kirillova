import { map, Observable, startWith, switchMap, scan, mapTo, tap, merge, concat, forkJoin, reduce, BehaviorSubject, first, mergeMap } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { AnimeType, AnimeStatus } from '@js-camp/core/models/animeCommon';
import { AnimeSeason, AnimeSource, AnimeRating, AnimeCreate } from '@js-camp/core/models/animeFull';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GenreService } from '../../../../core/services/anime/genre.service';

import { GenreType, GenreCreate } from './../../../../../../../libs/core/models/genre';

import { AnimeService } from './../../../../core/services/anime/anime.service';

import { StudioService } from './../../../../core/services/anime/studio.service';

// import { DialogAddStudioComponent } from './dialog-add-studio/dialog-add-studio.component';

// const RELOAD_TOP_SCROLL_POSITION = 100;

interface GenreData {
  type: GenreType;
  name: string;
}

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

  /** Whether books are loading or not. */
  public readonly isGenreLoading$ = new BehaviorSubject<boolean>(false);

  /** Count of anime with specified parameters. */
  public typeNextUrl: string | undefined;

  /** Count of anime with specified parameters. */
  public genreNextUrl: string | undefined;

  /** */
  public animeForm: FormGroup<AnimeFormControl>;

  /** */
  public searchStudio = new FormControl('');

  public constructor(
    public dialog: MatDialog,
    private readonly genreService: GenreService,
    private readonly studioService: StudioService,
    private readonly animeService: AnimeService,
    private readonly cdr: ChangeDetectorRef,
  ) {

    this.genresList$ = this.genreService.fetchGenres(this.genreNextUrl).pipe(
      tap(() => this.isGenreLoading$.next(true)),
      map(res => {
        this.genreNextUrl = res.next;
        return res.results;
      }),
      tap(() => this.isGenreLoading$.next(false)),
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
  public openDialogStudio(): void {
    const dialogRef = this.dialog.open(DialogAddStudioComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== '') {
        this.createStudio(result);
      }
    });
  }

  /** */
  public openDialogGenre(): void {
    const dialogRef = this.dialog.open(
      DialogAddGenreComponent,
      { data: { name: '', type: GenreType.Genres } as GenreData },
    );
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((result: GenreCreate) => {
      if (result.name !== undefined && result.name !== '') {
        this.createGenre(result);
        this.genreLoading();
      }
    });
  }

  /** */
  public createAnime(): void {
    this.animeService.createAnime(this.animeForm.value as AnimeCreate).subscribe();
  }

  /** */
  public createGenre(genreData: GenreCreate): void {
    this.genreService.createGenre(genreData).pipe(
      tap(newGenre => this.addStudio(newGenre)),
    )
      .subscribe();
  }

  /** */
  public createStudio(name: string): void {
    this.studioService.create(name).pipe(
      tap(newStudio => this.addStudio(newStudio)),
    )
      .subscribe();
  }

  // this.addStudio({ id, name })

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
    this.searchStudio.setValue('');
    if (this.studios.some(({ id }) => studio.id === id)) {
      return;
    }
    this.studios.push(studio);
  }

  /** */
  public genreLoading(): void {
    const nextGenresList$ = this.genreService.fetchGenres(this.genreNextUrl).pipe(
      tap(() => this.isGenreLoading$.next(true)),
      map(res => {
        this.genreNextUrl = res.next;
        return res.results;
      }),
    );
    this.genresList$ = forkJoin(
      [
        this.genresList$,
        nextGenresList$,
      ],
    ).pipe(
      map(genres => genres.flat(1)),
      tap(() => this.isGenreLoading$.next(false)),
    );
    this.isGenreLoading$.next(false);
  }
}

/** */
@Component({
  selector: 'camp-dialog-add-studio',
  templateUrl: './dialog-add-studio.component.html',

  // styleUrls: ['./dialog-add-studio.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddStudioComponent {

  public constructor(public dialogRef: MatDialogRef<DialogAddStudioComponent>,
    @Inject(MAT_DIALOG_DATA) public studioName: string) { }

  /** */
  public onNoClick(): void {
    this.dialogRef.close();
  }
}

/** */
@Component({
  selector: 'camp-dialog-add-genre',
  templateUrl: './dialog-add-genre.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddGenreComponent {

  /** Anime rating. */
  public readonly typeList: readonly GenreType[] = Object.values(GenreType);

  public constructor(public dialogRef: MatDialogRef<DialogAddGenreComponent>,
    @Inject(MAT_DIALOG_DATA) public genreData: GenreData) {
    console.log(this.typeList);

  }

  /** */
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
