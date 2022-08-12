import { Injectable } from '@angular/core';
import { catchError, first, map, mapTo, Observable, switchMap, throwError, of, shareReplay } from 'rxjs';

import { User } from '@js-camp/core/models/user';

import { HttpClient } from '@angular/common/http';

import { UserDto } from '@js-camp/core/dtos/user.dto';

import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { Router } from '@angular/router';

import { FieldErrorMapper } from '@js-camp/core/mappers/fieldError.mapper';

import { FieldError } from '@js-camp/core/models/fieldError';

import { catchHttpErrorResponse } from '../../utils/catch-http-error-response';

import { LoginData, RegistrationData } from '../interfaces/auth.interface';

import { TokenStorageService } from './token-storage.service';

import { AuthService } from './auth.service';

/** Stateful service for storing/managing information about the current user. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Current user. Null when user is not logged in. */
  public readonly currentUser$: Observable<User | null>;

  /** Whether the user is authorized. */
  public readonly isAuthorized$: Observable<boolean>;

  private readonly currentUserUrl: string;

  public constructor(
    private readonly tokenStorage: TokenStorageService,
    private readonly authService: AuthService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {

    this.currentUser$ = this.initCurrentUserStream();
    this.isAuthorized$ = this.currentUser$.pipe(map(user => user != null));
    this.currentUserUrl = 'users/profile/';
  }

  /**
   * Register a user.
   * @param userData Register data.
   */
  public register(userData: RegistrationData): Observable<null | FieldError> {
    return this.authService.register(userData).pipe(
      switchMap(token => this.tokenStorage.saveToken(token)),
      switchMap(() => this.redirectAfterAuthorization()),
      map(() => null),
      catchHttpErrorResponse(error => of(FieldErrorMapper.fromDto(error.error))),
    );
  }

  /**
   * Login a user.
   * @param userData Login data.
   */
  public login(userData: LoginData): Observable<null | FieldError> {
    return this.authService.login(userData).pipe(
      switchMap(token => this.tokenStorage.saveToken(token)),
      switchMap(() => this.redirectAfterAuthorization()),
      map(() => null),
      catchHttpErrorResponse(error => of(FieldErrorMapper.fromDto(error.error))),
    );
  }

  /** Update user token, supposed to be called when user data is outdated. */
  public refreshToken(): Observable<void> {
    return this.tokenStorage.getToken().pipe(
      first(),
      switchMap(token =>
        token != null ?
          this.authService.refreshToken(token) :
          throwError(() => new Error('Unauthorized'))),

      catchError(() =>
        this.tokenStorage
          .removeToken()),
      switchMap(newToken => newToken ?
        this.tokenStorage.saveToken(newToken) :
        of(null)),
      mapTo(void 0),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
  }

  private initCurrentUserStream(): Observable<User | null> {
    return this.tokenStorage.getToken().pipe(
      switchMap(token => (token ? this.getCurrentUser() : of(null))),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
  }

  private getCurrentUser(): Observable<User | null> {
    return this.http
      .get<UserDto>(this.currentUserUrl)
      .pipe(
        map(user => UserMapper.fromDto(user)),
      );
  }

  private async redirectAfterAuthorization(): Promise<void> {
    const DEFAULT_REDIRECT_URL = '/';
    const route = this.router.createUrlTree([DEFAULT_REDIRECT_URL]);
    await this.router.navigateByUrl(route);
  }
}
