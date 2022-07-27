import { ActivatedRoute, Params, Router } from '@angular/router';
import { formatDate } from '@js-camp/core/utils/formatDate';
import { Component, OnInit } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable, map } from 'rxjs';

import { Sort } from '@angular/material/sort';

import { PageEvent } from '@angular/material/paginator';

import { AnimeSort, Order } from '@js-camp/core/models/animeSort';

import { AnimeQueryParams } from './../../../core/interfaces/AnimeQueryOptions';

import { AnimeService } from './../../../core/services/anime.service';

/** Anime Component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})

export class AnimeComponent implements OnInit {
  /** Displayed columns. */
  public readonly displayedColumns = ['image', 'title', 'type', 'status', 'airingStart'];

  /** Sort columns. */
  public sortedData: Order[] = ['titleEnglish', 'status', 'airedStart'];

  /** Data for a table with anime.  */
  public anime$: Observable<readonly Anime[]>;

  /** Data for a table with anime.  */
  public animeCount = 0;

  /** Data for a table with anime.  */
  public pageIndex = 0;

  /** Data for a table with anime.  */
  public limit = 25;

  public constructor(
    private animeServer: AnimeService,

    private router: Router,

    private route: ActivatedRoute,
  ) {
    this.anime$ = this.getAnime();
  }

  /** */
  public ngOnInit(): void {
    this.router.navigate([], { queryParams: {} });
    this.route.queryParams.subscribe(res => {
      this.anime$ = this.getAnime(res);
    });
  }

  /**
   * The function formats date to 'dd.mm.yyyy' or 'no date'.
   * @param date Date.
   */
  public wrapperFormatDate(date: Date | null): string {
    return formatDate(date);
  }

  /**
   * Apply search to anime table.
   * @param event Event search.
   */
  public applySearch(event: Event): void {
    this.pageIndex = 0;
    const filterValue = (event.target as HTMLInputElement).value;
    this.addParametersToUrl('search', filterValue);
  }

  /**
   *
   * @param page
   */
  public applyPagination(page: PageEvent): void {
    this.pageIndex = page.pageIndex;
    this.limit = page.pageSize;
    this.addParametersToUrl('pageIndex', page.pageIndex);
  }

  /**
   *
   * @param sort
   */
  public applySort(sort: Sort): void {
    this.pageIndex = 0;

    switch (sort.direction) {
      case 'asc':
        this.addParametersToUrl('ordering', `${sort.active},+`);
        break;
      case 'desc':
        this.addParametersToUrl('ordering', `${sort.active},-`);
        break;
      default:
        this.addParametersToUrl('ordering', null);
    }
  }

  /**
   * Append query parameters to URL.
   * @param name Parameter name.
   * @param value Parameter value.
   */
  private addParametersToUrl(name: string, value: string | null | number): void {
    this.router.navigate([], {
      queryParams: {
        [name]: value,
      },
      queryParamsHandling: 'merge',
    });
  }

  private getAnime(param?: Params): Observable<readonly Anime[]> {
    let sort: AnimeSort | undefined;
    if (param?.['ordering'] !== undefined) {
      sort = param['ordering'].split(',');
    } else {
      sort = undefined;
    }

    // console.log(param, param ? param['ordering'] : '5');
    // const sort = param?.['ordering'] !== undefined ? param['ordering'].split(',') : undefined;
    const animeQueryParams: AnimeQueryParams = {
      limit: this.limit,
      page: this.pageIndex,
      sort: sort ? {
        order: sort.order,
        direction: sort.direction,
      } : undefined,
      search: param ? param['search'] : undefined,
      type: param ? param['type'] : undefined,
    };

    return this.animeServer.fetchAnime(animeQueryParams).pipe(
      map(res => {
        this.animeCount = res.count;
        return res.results;
      }),
    );
  }
}
