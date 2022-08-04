import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Token } from '@js-camp/core/models/token';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';

import { RegistrationData } from '../utils/interfaces/auth.interface';

import { LoginData } from './../utils/interfaces/auth.interface';

/** Auth service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  /**
   *
   * @param userData
   */
  public register(userData: RegistrationData): Observable<Token> {
    return this.http.post<TokenDto>('/auth/register/', userData)
      .pipe(
        map(TokenMapper.fromDto),
      );
  }

  /**
   *
   * @param userData
   */
  public login(userData: LoginData): Observable<Token> {
    return this.http.post<TokenDto>('/auth/login/', userData)
      .pipe(
        map(TokenMapper.fromDto),
      );
  }
}
