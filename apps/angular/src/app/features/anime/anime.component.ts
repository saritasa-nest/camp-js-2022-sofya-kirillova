import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { Observable, map, switchMap, BehaviorSubject, tap, debounceTime, combineLatest, startWith } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { Direction, Order } from '@js-camp/core/models/animeSort';

import { FormControl } from '@angular/forms';

import { PageEventSort, SortDirection } from '@angular/material/sort';

import { AnimeService } from './../../../core/services/anime.service';

interface ParamToUrl {
  [key: string]: string | null | number;
}

const defaultAnimeParams = {
  pagination: {
    pageIndex: 0,
    pageSize: 25,
  },
  sort: {
    ordering: 'titleEnglish',
    direction: Direction.Ascending,
  },
  search: '',
  types: [] as AnimeType[],
};

const fetchDelayInMilliseconds = 500;

/** Anime Component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimeComponent {

  /** Anime types displayed. */
  public readonly typeList: readonly AnimeType[] = [
    AnimeType.Tv,
    AnimeType.Ova,
    AnimeType.Movie,
    AnimeType.Special,
    AnimeType.Ona,
    AnimeType.Music,
  ];

  /** Displayed columns. */
  public readonly displayedColumns = ['image', 'title', 'type', 'status', 'airingStart'] as const;

  /** Data for a table with anime. */
  public readonly anime$: Observable<readonly Anime[]>;

  /** Count of anime in the database. */
  public animeCount = 0;

  /** Sorting Options. */
  public readonly sort$ = new BehaviorSubject<PageEventSort>({
    active: this.route.snapshot.queryParamMap.get('order') ?? defaultAnimeParams.sort.ordering,
    direction: this.route.snapshot.queryParamMap.get('direction') as SortDirection ?? 'asc',
  });

  private readonly pageSize$ = new BehaviorSubject<number>(
    Number(this.route.snapshot.queryParamMap.get('pageSize')) ?? defaultAnimeParams.pagination.pageSize,
  );

  /** Current page. */
  public readonly pageIndex$ = new BehaviorSubject<number>(
    Number(this.route.snapshot.queryParamMap.get('pageIndex')) ?? defaultAnimeParams.pagination.pageIndex,
  );

  /** Whether books are loading or not. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Filtering field form controller. */
  public filterFormControl = new FormControl<AnimeType[]>(
    this.route.snapshot.queryParamMap.get('types')?.split(',') as AnimeType[] ?? defaultAnimeParams.types,
    { nonNullable: true },
  );

  /** Searching input form controller. */
  public searchFormControl = new FormControl(this.route.snapshot.queryParamMap.get('search') ?? defaultAnimeParams.search);

  public constructor(
    private readonly animeService: AnimeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.filterFormControl.valueChanges.subscribe(() => {
      this.pageIndex$.next(defaultAnimeParams.pagination.pageIndex);
    });
    this.searchFormControl.valueChanges.subscribe(() => {
      this.pageIndex$.next(defaultAnimeParams.pagination.pageIndex);
    });
    const params$ = combineLatest([
      this.searchFormControl.valueChanges.pipe(
        startWith(this.searchFormControl.value),
      ),
      this.filterFormControl.valueChanges.pipe(
        startWith(this.filterFormControl.value),
      ),
      this.sort$,
      this.pageSize$,
      this.pageIndex$,
    ]);

    this.anime$ = params$.pipe(
      debounceTime(fetchDelayInMilliseconds),
      tap(() => {
        scrollTo(0, 0);
        this.isLoading$.next(true);
      }),
      switchMap(([search, types, sort, pageSize, pageIndex]) => {
        this.addParametersToUrl({
          order: sort.active,
          direction: sort.direction,
          pageSize,
          pageIndex,
          search,
          types: types.join(','),
        });

        return this.animeService.fetchAnime({
          limit: pageSize,
          page: pageIndex,
          sort: {
            order: sort.active as Order ?? defaultAnimeParams.sort.ordering,
            direction: sort.direction === 'desc' ? Direction.Descending : Direction.Ascending,
          },
          search: search ?? defaultAnimeParams.search,
          types: types ?? defaultAnimeParams.types,
        });
      }),
      map(res => {
        this.animeCount = res.count;
        this.isLoading$.next(false);
        return res.results;
      }),
    );
  }

  /**
   * Handle pagination to anime table.
   * @param page Paginator event.
   */
  public handlePaginationChange(page: PageEvent): void {
    this.pageSize$.next(page.pageSize);
    this.pageIndex$.next(page.pageIndex);
  }

  /**
   * Handle sort to anime table.
   * @param sort Sort event.
   */
  public handleSortChange(sort: PageEventSort): void {
    this.sort$.next(sort);
    this.pageIndex$.next(defaultAnimeParams.pagination.pageIndex);
  }

  private addParametersToUrl(params: ParamToUrl): void {
    this.router.navigate([], {
      queryParams: {
        ...params,
      },
    });
  }

  /**
   * Function to track anime.
   * @param _index Index.
   * @param anime Anime to track.
   */
  public trackAnime(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }
}
