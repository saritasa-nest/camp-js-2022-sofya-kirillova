import { AnimeSortMapper } from '@js-camp/core/mappers/animeSort.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeListMapper } from '@js-camp/core/mappers/animeLIst.mapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeCommonDto } from '@js-camp/core/dtos/animeCommon.dto';
import { AnimeCommon } from '@js-camp/core/models/animeCommon';

import { AnimeCommonMapper } from '@js-camp/core/mappers/animeCommon.mapper';

import { AnimeQueryParams } from './interfaces/AnimeQueryOptions';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  /**
   * Get Anime.
   * @param params Anime Parameters.
   */
  public fetchAnime(params: AnimeQueryParams): Observable<Pagination<AnimeCommon>> {
    const additionalSortingParameter = 'id';
    const types = params.types.length > 0 ?
      params.types.map(type => AnimeCommonMapper.toDtoMapType[type]).join(',') :
      '';

    const url = new HttpParams()
      .set('limit', params.limit)
      .set('offset', params.page * params.limit)
      .set('ordering', `${AnimeSortMapper.toDto(params.sort)},${additionalSortingParameter}`)
      .set('search', params.search)
      .set('type__in', types);

    return this.http.get<PaginationDto<AnimeCommonDto>>(`anime/anime/`, { params: url })
      .pipe(
        map(response => AnimeListMapper.fromDto(response)),
      );
  }
}
