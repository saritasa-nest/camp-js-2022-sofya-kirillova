import { Injectable } from '@angular/core';
import { catchError, tap, first, map, mapTo, Observable, switchMap, switchMapTo, throwError, of } from 'rxjs';

import { User } from '@js-camp/core/models/user';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserDto } from '@js-camp/core/dtos/user.dto';

import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { Router } from '@angular/router';

import { FieldErrorMapper } from '@js-camp/core/mappers/fieldError.mapper';

import { FieldError } from '@js-camp/core/models/fieldError';

import { filterNull } from '../utils/filter-null';

import { LoginData, RegistrationData } from './interfaces/auth.interface';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Current user. Null when user is not logged in. */
  public readonly currentUser$: Observable<User | null>;

  /** Whether the user is authorized. */
  public readonly isAuthorized$: Observable<boolean>;

  public constructor(
    private readonly tokenStorage: TokenStorageService,
    private readonly authService: AuthService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {

    this.currentUser$ = this.initCurrentUserStream();
    this.isAuthorized$ = this.currentUser$.pipe(map(user => user != null));
  }

  /**
   *
   * @param userData
   */
  public register(userData: RegistrationData): Observable<null | FieldError> {
    return this.authService.register(userData).pipe(
      switchMap(token => this.tokenStorage.saveToken(token)),
      switchMap(() => this.redirectAfterAuthorization()),
      map(() => null),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return of(FieldErrorMapper.fromDto(error.error));
        }
        throw error;
      }),
    );
  }

  /**
   *
   * @param userData
   */
  public login(userData: LoginData): Observable<null | FieldError> {
    return this.authService.login(userData).pipe(
      switchMap(token => this.tokenStorage.saveToken(token)),
      switchMap(() => this.redirectAfterAuthorization()),
      map(() => null),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return of(FieldErrorMapper.fromDto(error.error));
        }
        throw error;
      }),
    );
  }

  /** Update user secret, supposed to be called when user data is outdated. */
  public refreshSecret(): Observable<void> {
    console.log(7678);
    return this.tokenStorage.getToken().pipe(
      switchMap(secret =>
        secret != null ?
          this.authService.refreshToken(secret) :
          throwError(() => new Error('Unauthorized'))),

      // In case token is invalid clear the storage and redirect to login page
      catchError(() =>
        this.tokenStorage
          .removeToken()
          .pipe(
            tap(() => {
              console.log('remove');
            }),
            switchMapTo(this.navigateToAuthPage()),
          )),
      switchMap(newToken => newToken ?
        this.tokenStorage.saveToken(newToken) :
        of(null)),
      mapTo(void 0),
    );
  }

  private initCurrentUserStream(): Observable<User | null> {
    return this.tokenStorage.getToken().pipe(
      switchMap(secret => (secret ? this.getCurrentUser() : of(null))),
    );
  }

  private getCurrentUser(): Observable<User | null> {
    return this.http
      .get<UserDto>('/users/profile/')
      .pipe(
        map(user => UserMapper.fromDto(user)),
      );
  }

  private async navigateToAuthPage(): Promise<void> {
    await this.router.navigate(['/authorization/login']);
  }

  private async redirectAfterAuthorization(): Promise<void> {
    const DEFAULT_REDIRECT_URL = '/';
    const route = this.router.createUrlTree([DEFAULT_REDIRECT_URL]);
    await this.router.navigateByUrl(route);
  }
}
