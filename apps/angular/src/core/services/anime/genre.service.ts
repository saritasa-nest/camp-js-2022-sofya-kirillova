import { Pagination } from '@js-camp/core/models/pagination';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, scan } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Genre, GenreCreate } from '@js-camp/core/models/genre';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';

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
    if (next === undefined) {
      return this.http.get<PaginationDto<GenreDto>>(`anime/genres/`)
        .pipe(
          map(response => PaginationMapper.fromDto(response, GenreMapper.fromDto)),
        );
    }
    return this.http.get<PaginationDto<GenreDto>>(next)
      .pipe(
        map(response => PaginationMapper.fromDto(response, GenreMapper.fromDto)),
      );

  }

  /**  */
  public createGenre(params: GenreCreate): Observable<Genre> {
    const genreDto = GenreMapper.toDto(params);
    return this.http.post<GenreDto>(`anime/genres/`, { ...genreDto })
      .pipe(
        map(response => GenreMapper.fromDto(response)),
      );
  }
}
