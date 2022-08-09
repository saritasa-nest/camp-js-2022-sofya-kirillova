import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { Observable, map, switchMap, BehaviorSubject, tap, debounceTime } from 'rxjs';

import { Sort, SortDirection } from '@angular/material/sort';

import { PageEvent } from '@angular/material/paginator';

import { Direction, Order } from '@js-camp/core/models/animeSort';

import { MatSelectChange } from '@angular/material/select';

import { AnimeQueryParams } from './../../../core/interfaces/AnimeQueryOptions';

import { AnimeService } from './../../../core/services/anime.service';

/** Name of Anime Parameters. */
enum NameAnimeParams {
  Ordering = 'ordering',
  SortingDirection = 'direction',
  PageIndex = 'pageIndex',
  PageSize = 'pageSize',
  Search = 'search',
  Types = 'types',
}

type ParamToUrl = Partial<Record<NameAnimeParams, string | null | number>>;

const FIRST_PAGE = 0;

const FETCH_DELAY_IN_MILLISECONDS = 500;

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
  public readonly defaultAnimeParams = {
    pagination: {
      pageIndex: Number(this.route.snapshot.queryParamMap.get(NameAnimeParams.PageIndex)) ?? FIRST_PAGE,
      pageSize: Number(this.route.snapshot.queryParamMap.get(NameAnimeParams.PageSize)) ?? 25,
    },
    sort: {
      ordering: this.route.snapshot.queryParamMap.get(NameAnimeParams.Ordering) ?? 'titleEnglish',
      direction: this.route.snapshot.queryParamMap.get(NameAnimeParams.SortingDirection) as SortDirection ?? Direction.Ascending,
    },
    search: this.route.snapshot.queryParamMap.get(NameAnimeParams.Search) ?? '',
    types: this.route.snapshot.queryParamMap.get(NameAnimeParams.Types)?.split(',') as AnimeType[] ?? [] as AnimeType[],
  } as const;

  /** Displayed columns. */
  public readonly displayedColumns = ['image', 'title', 'type', 'status', 'airingStart'] as const;

  /** Anime sort displayed. */
  public readonly sortedData: readonly Order[] = ['titleEnglish', 'status', 'airedStart'];

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
      limit: param[NameAnimeParams.PageSize],
      page: param[NameAnimeParams.PageIndex],
      sort: {
        order: param[NameAnimeParams.Ordering],
        direction: param[NameAnimeParams.SortingDirection] === 'desc' ? Direction.Descending : Direction.Ascending,
      },
      search: param[NameAnimeParams.Search] ?? '',
      types: [param[NameAnimeParams.Types]] ?? '',
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
