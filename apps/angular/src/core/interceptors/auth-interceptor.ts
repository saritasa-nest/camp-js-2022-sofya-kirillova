import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { AppConfigService } from '../services/app-config.service';
import { AuthService } from '../services/user/auth.service';
import { TokenStorageService } from '../services/user/token-storage.service';

/** Interceptor to add access token to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userTokenStorage: TokenStorageService,
    private readonly authService: AuthService,
  ) { }

  /**
   * Appends bearer token.
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptToken(req.url)) {
      const userToken$ = this.userTokenStorage.getToken().pipe(first());

      return userToken$.pipe(
        map(userToken =>
          userToken ?
            req.clone({
              headers: this.authService.appendAuthorizationHeader(
                req.headers,
                userToken,
              ),
            }) :
            req),
        switchMap(newReq => next.handle(newReq)),
      );
    }
    return next.handle(req);
  }

  private shouldInterceptToken(url: string): boolean {
    return url.startsWith(this.appConfigService.apiUrl);
  }
}
