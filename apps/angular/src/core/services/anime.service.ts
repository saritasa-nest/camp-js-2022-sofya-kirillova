
import { AnimeListMapper } from '@js-camp/core/mappers/animeLIst.mapper';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  /** Get Anime. */
  public getAnime(): Observable<readonly Anime[]> {
    return this.http.get<PaginationDto<AnimeDto>>('/anime/anime/')
      .pipe(
        map(response => AnimeListMapper.fromDto(response)),
        map(response => response.results),
      );
  }
}
