import { Pagination } from '@js-camp/core/models/pagination';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, scan } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Genre } from '@js-camp/core/models/genre';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

/** Genre service. */
@Injectable({
  providedIn: 'root',
})
export class GenreService {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  /**  */
  public fetchGenres(next: string | undefined): Observable<Pagination<Genre>> {
    console.log(2, next)
    if (next === undefined) {
      return this.http.get<PaginationDto<Genre>>(`anime/genres/`)
        .pipe(
          map(response => PaginationMapper.fromDto(response, GenreMapper.fromDto)),
        );
    }
    return this.http.get<PaginationDto<Genre>>(next)
      .pipe(
        map(response => PaginationMapper.fromDto(response, GenreMapper.fromDto)),
      );

  }

  /**  */
  public createGenre(): Observable<unknown> {
    const urlParams = new HttpParams();
    return this.http.post<PaginationDto<Genre>>(`anime/genres/`, { urlParams });
  }
}
