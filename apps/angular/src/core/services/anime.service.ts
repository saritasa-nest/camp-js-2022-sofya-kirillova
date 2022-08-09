import { AnimeListMapper } from '@js-camp/core/mappers/animeLIst.mapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeSortMapper } from '@js-camp/core/mappers/animeSort.mapper';
import { Pagination } from '@js-camp/core/models/pagination';

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
  public fetchAnime(params: AnimeQueryParams): Observable<Pagination<Anime>> {
    const additionalSortingParameter = 'id';

    const types = params.types.length > 0 ?
      params.types.map(type => AnimeMapper.toDtoMapType[type]).join(',') :
      '';
    const httpParams = new HttpParams()
      .set('limit', params.limit)
      .set('offset', params.page * params.limit)
      .set('ordering', `${AnimeSortMapper.toDto(params.sort)},${additionalSortingParameter}`)
      .set('search', params.search)
      .set('type__in', types);

    return this.http.get<PaginationDto<AnimeDto>>(`anime/anime/`, { params: httpParams })
      .pipe(
        map(response => AnimeListMapper.fromDto(response)),
      );
  }
}
