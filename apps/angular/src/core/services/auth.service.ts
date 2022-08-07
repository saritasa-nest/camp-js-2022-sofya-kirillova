import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, throwError } from 'rxjs';

import { Token } from '@js-camp/core/models/token';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';

import { AppError } from '@js-camp/core/models/app-error';

import { catchHttpErrorResponse } from '../utils/catch-http-error-response';

import { LoginData, RegistrationData } from './interfaces/auth.interface';

const AUTH_PREFIX = 'Token';

/** Auth service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(
    private readonly http: HttpClient,
  ) { }

  /**
   * Verify account registration.
   * @param verificationToken Account verification token.
   */
  public verifyAccount(
    verificationToken: string,
  ): Observable<Token> {
    const TOKEN_SEPARATOR = '-';
    const [uid, ...tokenTail] = verificationToken.split(TOKEN_SEPARATOR);

    return this.http.post<TokenDto>('auth/token/verify/', {
      uid,
      token: tokenTail.join(TOKEN_SEPARATOR),
    })
      .pipe(
        map(dto => TokenMapper.fromDto(dto)),
        catchHttpErrorResponse(error => throwError(() => new AppError(error.error.detail))),
      );
  }

  /**
   * Refresh user's secret.
   * @param secret Secret data.
   */
  public refreshToken(
    secret: Token,
  ): Observable<Token> {
    return this.http.post<TokenDto>(
      '/auth/token/refresh/',
      TokenMapper.toDto(secret),
    )
      .pipe(
        map(refreshedSecret =>
          TokenMapper.fromDto({
            ...secret,
            ...refreshedSecret,
          })),
      );
  }

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

  /**
   * Appends authorization header to a list of `headers`.
   * @param headers Headers list.
   * @param token User secret.
   */
  public appendAuthorizationHeader(
    headers: HttpHeaders,
    token: Token,
  ): HttpHeaders {
    console.log(787)
    return headers.set('Authorization', `${token.access}`);
  }
}
