import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { Observable, map, switchMap, BehaviorSubject, tap, debounceTime, combineLatest, merge, startWith } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { Direction, Order } from '@js-camp/core/models/animeSort';

import { FormControl, FormGroup } from '@angular/forms';

import { PageEventSort } from '@angular/material/sort';

import { AnimeQueryParams } from './../../../core/interfaces/AnimeQueryOptions';

import { AnimeService } from './../../../core/services/anime.service';

interface ParamToUrl {
  [key: string]: string | null | number;
}

const defaultAnimeParams = {
  pageIndex: 0,
  pageSize: 25,
  ordering: 'titleEnglish',
  direction: Direction.Ascending,
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

  private sort$ = new BehaviorSubject<PageEventSort>({ active: defaultAnimeParams.ordering, direction: 'asc' });

  /** */
  public pagination$ = new BehaviorSubject<PageEvent>({
    length: this.animeCount,
    pageIndex: defaultAnimeParams.pageIndex,
    pageSize: defaultAnimeParams.pageSize,
  });

  /** Whether books are loading or not. */
  public isLoading$ = new BehaviorSubject<boolean>(false);

  /** */
  public myForm: FormGroup = new FormGroup({

    search: new FormControl(''),
    types: new FormControl([]),
  });

  public constructor(
    private readonly animeService: AnimeService,
    private readonly router: Router,
    route: ActivatedRoute,
  ) {
    const params$ = combineLatest([
      this.myForm.controls['search'].valueChanges.pipe(
        startWith(this.myForm.controls['search'].value),
      ),
      this.myForm.controls['types'].valueChanges.pipe(
        startWith(this.myForm.controls['types'].value),
      ),
      this.sort$,
      this.pagination$,
    ]);

    this.anime$ = params$.pipe(
      debounceTime(fetchDelayInMilliseconds),
      tap(() => this.isLoading$.next(true)),
      switchMap(([search, types, sort, pagination]) => this.animeService.fetchAnime({
            limit: pagination.pageSize,
            page: pagination.pageIndex,
            sort: {
              order: sort.active as Order ?? 'titleEnglish',
              direction: Direction.Ascending,
            },
            search: search ?? '',
            types: types ?? '',
      })),
      map(res => {
        this.animeCount = res.count;
        this.isLoading$.next(false);
        return res.results;
      }),
    );
  }

  /**
   * Apply pagination to anime table.
   * @param page Paginator event.
   */
  public applyPagination(page: PageEvent): void {
    // this.pageIndex$.next(page);
    // this.pageIndex = page.pageIndex;
    this.addParametersToUrl({ pageIndex: page.pageIndex, pageSize: page.pageSize });
  }

  /**
   * Apply sort to anime table.
   * @param sort Sort event.
   */
  public applySort(sort: PageEventSort): void {
    this.sort$.next(sort);

    // this.pageIndex = 0;
    switch (sort.direction) {
      case 'desc':
        this.addParametersToUrl({ ordering: sort.active, direction: Direction.Descending });
        break;
      case 'asc':
      default:
        this.addParametersToUrl({ ordering: sort.active, direction: Direction.Ascending });
        break;
    }
  }

  private addParametersToUrl(params: ParamToUrl): void {
    this.router.navigate([], {
      queryParams: {
        ...params,
      },
      queryParamsHandling: 'merge',
    });
  }

  private getAnime(param: Params): Observable<readonly Anime[]> {
    const animeQueryParams: AnimeQueryParams = {
      limit: param['pageSize'],
      page: 0,
      sort: {
        order: param['ordering'],
        direction: param['direction'],
      },
      search: param['search'] ?? '',
      types: param['types'] ?? '',
    };
    return this.animeService.fetchAnime(animeQueryParams).pipe(
      map(res => {
          this.animeCount = res.count;
          return res.results;
        }),
    );
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
