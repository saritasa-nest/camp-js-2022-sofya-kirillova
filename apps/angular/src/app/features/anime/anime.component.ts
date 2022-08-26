import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { Observable, map, switchMap, BehaviorSubject, tap, debounceTime } from 'rxjs';

import { Sort, SortDirection } from '@angular/material/sort';

import { PageEvent } from '@angular/material/paginator';

import { Direction, AnimeOrder } from '@js-camp/core/models/animeSort';

import { MatSelectChange } from '@angular/material/select';

import { AnimeQueryParams } from './../../../core/interfaces/AnimeQueryOptions';

import { AnimeService } from './../../../core/services/anime.service';

/** Name of Anime Parameters. */
enum AnimeParamName {
  Ordering = 'ordering',
  SortingDirection = 'direction',
  PageIndex = 'pageIndex',
  PageSize = 'pageSize',
  Search = 'search',
  Types = 'types',
}

type ParamToUrl = Partial<Record<AnimeParamName, string | null | number>>;

const FIRST_PAGE = 0;

const FETCH_DELAY_IN_MILLISECONDS = 500;

interface AnimeParams {

  /** Pagination options. */
  readonly pagination: {

    /** Current page. */
    readonly pageIndex: number;

    /** The number of anime returned per page. */
    readonly pageSize: number;
  };

  /** Sorting options. */
  readonly sort: {

    /** Field by sort. */
    readonly ordering: AnimeOrder;

    /** Ordering direction. */
    readonly direction: SortDirection;
  };

  /** Search settings. */
  readonly search: string;

  /** Anime type. */
  readonly types: readonly AnimeType[];
}

/** Anime Component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
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

  /** Default anim params. */
  public readonly defaultAnimeParams: AnimeParams = this.setDefaultAnimeParams();

  /** Displayed columns. */
  public readonly displayedColumns = ['image', 'title', 'type', 'status', 'airingStart'] as const;

  /** Anime sort displayed. */
  public readonly sortedData: readonly AnimeOrder[] = ['titleEnglish', 'status', 'airedStart'];

  /** Data for a table with anime. */
  public readonly anime$: Observable<readonly Anime[]>;

  /** Count of anime with specified parameters. */
  public animeCount = 0;

  /** Current page. */
  public pageIndex = this.defaultAnimeParams.pagination.pageIndex;

  /** Whether books are loading or not. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly animeService: AnimeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.anime$ = route.queryParams.pipe(
      debounceTime(FETCH_DELAY_IN_MILLISECONDS),
      tap(() => this.isLoading$.next(true)),
      switchMap(res => this.getAnime(res)),
      tap(() => this.isLoading$.next(false)),
    );
  }

  /**
   * Handle search to anime table.
   * @param event Search event.
   */
  public handleSearchChange(event: Event): void {
    this.pageIndex = FIRST_PAGE;
    const filterValue = (event.target as HTMLInputElement).value;
    this.addParametersToUrl({ search: filterValue });
  }

  /**
   * Handle pagination to anime table.
   * @param page Paginator event.
   */
  public handlePaginationChange(page: PageEvent): void {
    this.pageIndex = page.pageIndex;
    this.addParametersToUrl({ pageIndex: page.pageIndex, pageSize: page.pageSize });
  }

  /**
   * Handle sort to anime table.
   * @param sort Sort event.
   */
  public handleSortChange(sort: Sort): void {
    this.pageIndex = FIRST_PAGE;
    this.addParametersToUrl({ ordering: sort.active, direction: sort.direction });
  }

  /**
   * Handle filtering by types to the anime table.
   * @param types Filter by types event.
   */
  public handleFilterChange(types: MatSelectChange): void {
    this.pageIndex = FIRST_PAGE;
    const type = types.value as AnimeType[];
    this.addParametersToUrl({ types: type.join(',') });
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
      limit: param[AnimeParamName.PageSize],
      page: param[AnimeParamName.PageIndex],
      sort: {
        order: param[AnimeParamName.Ordering],
        direction: param[AnimeParamName.SortingDirection] === 'desc' ? Direction.Descending : Direction.Ascending,
      },
      search: param[AnimeParamName.Search] ?? '',
      types: [param[AnimeParamName.Types]] ?? '',
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

  private setDefaultAnimeParams(): AnimeParams {
    const snapshot = this.route.snapshot.queryParamMap;
    const defaultAnimeParams: AnimeParams = {
      pagination: {
        pageIndex: Number(snapshot.get(AnimeParamName.PageIndex)) ?? FIRST_PAGE,
        pageSize: Number(snapshot.get(AnimeParamName.PageSize)) ?? 25,
      },
      sort: {
        ordering: snapshot.get(AnimeParamName.Ordering) as AnimeOrder ?? 'titleEnglish',
        direction: snapshot.get(AnimeParamName.SortingDirection) as SortDirection ?? Direction.Ascending,
      },
      search: snapshot.get(AnimeParamName.Search) ?? '',
      types: snapshot.get(AnimeParamName.Types)?.split(',') as AnimeType[] ?? [],
    } as const;
    return defaultAnimeParams;
  }
}
