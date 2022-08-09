import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Token } from '@js-camp/core/models/token';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';

import { LoginData, RegistrationData } from './interfaces/auth.interface';

const AUTH_PREFIX = 'Bearer';

/** Stateless service for handling the authorization requests. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly registerUrl: string;

  private readonly loginUrl: string;

  private readonly refreshTokenUrl: string;

  public constructor(
    private readonly http: HttpClient,
  ) {
    this.registerUrl = 'auth/register/';
    this.loginUrl = 'auth/login/';
    this.refreshTokenUrl = 'auth/token/refresh//';
  }

  /**
   * Register a user.
   * @param userData Register data.
   */
  public register(userData: RegistrationData): Observable<Token> {
    return this.http.post<TokenDto>(this.registerUrl, userData)
      .pipe(
        map(TokenMapper.fromDto),
      );
  }

  /**
   * Login a user.
   * @param userData Login data.
   */
  public login(userData: LoginData): Observable<Token> {
    return this.http.post<TokenDto>(this.loginUrl, userData)
      .pipe(
        map(TokenMapper.fromDto),
      );
  }

  /**
   * Refresh user's token.
   * @param token Token data.
   */
  public refreshToken(
    token: Token,
  ): Observable<Token> {
    return this.http.post<TokenDto>(
      this.refreshTokenUrl,
      TokenMapper.toDto(token),
    )
      .pipe(
        map(refreshedToken => TokenMapper.fromDto({
          ...token,
          ...refreshedToken,
        })),
      );
  }

  /**
   * Appends authorization header to a list of `headers`.
   * @param headers Headers list.
   * @param token User token.
   */
  public appendAuthorizationHeader(
    headers: HttpHeaders,
    token: Token,
  ): HttpHeaders {
    return headers.set('Authorization', `${AUTH_PREFIX} ${token.access}`);
  }
}
