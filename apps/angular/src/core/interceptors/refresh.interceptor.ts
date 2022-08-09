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

/** Interceptor handles requests with outdated tokens. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  public constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
  ) { }

  /**
   * Refreshes a token.
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && (error.status !== 401 || this.shouldInterceptToken(req.url))) {
          return throwError(() => error);
        }

        return this.userService.refreshToken().pipe(
          switchMap(() => next.handle(req)),
        );
      }),
    );
  }

  private shouldInterceptToken(url: string): boolean {
    return url.startsWith(
      new URL('auth', this.appConfigService.apiUrl).toString(),
    );
  }
}
