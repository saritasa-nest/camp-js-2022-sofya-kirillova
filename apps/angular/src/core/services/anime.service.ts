import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { environment, httpOptions } from '../../environments/environment';

/** Anime server. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  public constructor(private http: HttpClient) {
  }

  /** Get. */
  public getHeroes(): Observable<PaginationDto<AnimeDto>> {
    return this.http.get<PaginationDto<AnimeDto>>(`${environment.apiUrl}/anime/anime/`, httpOptions);
  }
}
