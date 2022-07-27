import { AnimeSortMapper } from '@js-camp/core/mappers/animeSort.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeListMapper } from '@js-camp/core/mappers/animeLIst.mapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { Anime } from '@js-camp/core/models/anime';

import { AnimeSortDto } from '@js-camp/core/dtos/animeSort';

import { AnimeQueryParams } from '../interfaces/AnimeQueryOptions';

/** Anime server. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get Anime.
   */
  public fetchAnime(params: AnimeQueryParams): Observable<Pagination<Anime>> {
    const additionalSortingParameter = 'id';
    const sort: AnimeSortDto = params.sort?.order ? AnimeSortMapper.toDto(params.sort) : 'title_eng';
    const search = params.search === undefined ? '' : params.search;
    const type = params.type === undefined ? '' : params.type;

    const url = new HttpParams()
      .set('limit', params.limit)
      .set('offset', params.page * params.limit)
      .set('ordering', `${sort},${additionalSortingParameter}`)
      .set('search', search)
      .set('type__in', type);

    return this.http.get<PaginationDto<AnimeDto>>(`/anime/anime/`, { params: url })
      .pipe(
        map(response => AnimeListMapper.fromDto(response)),
      );
  }
}
