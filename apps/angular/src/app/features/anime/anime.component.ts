import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { Observable, map, switchMap, timer } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { PageEvent } from '@angular/material/paginator';

import { Direction, Order } from '@js-camp/core/models/animeSort';

import { MatSelectChange } from '@angular/material/select';

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

  /** Anime sort displayed.. */
  public readonly sortedData: readonly Order[] = ['titleEnglish', 'status', 'airedStart'];

  /** Data for a table with anime.  */
  public readonly anime$: Observable<readonly Anime[]>;

  /** Count of anime in the database.  */
  public animeCount = 0;

  /** Current page.  */
  public pageIndex = defaultAnimeParams.pageIndex;

  public constructor(
    private animeServer: AnimeService,
    private router: Router,
    route: ActivatedRoute,
  ) {
    this.router.navigate([], {
      queryParams: { ...defaultAnimeParams },
    });
    this.anime$ = route.queryParams.pipe(
      switchMap(res => this.getAnime(res)),
    );
  }

  /**
   * Apply search to anime table.
   * @param event Search event.
   */
  public applySearch(event: Event): void {
    this.pageIndex = 0;
    const filterValue = (event.target as HTMLInputElement).value;
    this.addParametersToUrl({ search: filterValue });
  }

  /**
   * Apply pagination to anime table.
   * @param page Paginator event.
   */
  public applyPagination(page: PageEvent): void {
    this.pageIndex = page.pageIndex;
    this.addParametersToUrl({ pageIndex: page.pageIndex, pageSize: page.pageSize });
  }

  /**
   * Apply sort to anime table.
   * @param sort Sort event.
   */
  public applySort(sort: Sort): void {
    this.pageIndex = 0;
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

  /**
   * Apply filtering by types to the anime table.
   * @param types Filter by types event.
   */
  public applyType(types: MatSelectChange): void {
    this.pageIndex = 0;
    this.addParametersToUrl({ types: types.value });
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
    const fetchDelayInMilliseconds = 500;
    const animeQueryParams: AnimeQueryParams = {
      limit: param['pageSize'],
      page: this.pageIndex,
      sort: {
        order: param['ordering'],
        direction: param['direction'],
      },
      search: param['search'] ?? '',
      types: param['types'] ?? '',
    };

    return timer(fetchDelayInMilliseconds).pipe(
      switchMap(() => this.animeServer.fetchAnime(animeQueryParams)),
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
