import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppConfigService } from '../services/app-config.service';
import { UserService } from '../services/user.service';

/** Interceptor to add access token to requests using Authorization HTTP header. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  private refreshTokenRequest$: Observable<void> | null = null;

  public constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
  ) { }

  /**
   * Appends bearer token.
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && (error.status !== 401 || this.shouldInterceptToken(req.url))) {
          console.log('true')
          return throwError(() => error);
        }

        this.refreshTokenRequest$ ??= this.userService.refreshSecret();

        return this.refreshTokenRequest$.pipe(
          switchMap(() => next.handle(req)),
        );
      }),
    );
  }

  /**
   * Checks if a request is for authorization or refresh token.
   * @param url - Request url.
   */
  private shouldInterceptToken(url: string): boolean {
    console.log(url.startsWith(new URL('auth', this.appConfigService.apiUrl).toString()));
    return !url.startsWith(new URL('auth', this.appConfigService.apiUrl).toString());
  }
}
