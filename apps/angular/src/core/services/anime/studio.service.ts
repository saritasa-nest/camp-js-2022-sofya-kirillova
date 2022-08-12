import { Pagination } from '@js-camp/core/models/pagination';
import { Studio } from '@js-camp/core/models/studio';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, scan } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

/** Studio service. */
@Injectable({
  providedIn: 'root',
})
export class StudioService {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  /**  */
  public fetchStudios(search?: string): Observable<Pagination<Studio>> {
    const urlParams = new HttpParams()
      .set('search', search === undefined ? '' : search);
    return this.http.get<PaginationDto<Studio>>(`anime/studios/`, { params: urlParams })
      .pipe(
        map(response => PaginationMapper.fromDto(response, StudioMapper.fromDto)),

      );
  }

  /**  */
  public create(): Observable<unknown> {
    const urlParams = new HttpParams();
    return this.http.post<PaginationDto<Studio>>(`anime/studios/`, { urlParams });
  }

}
