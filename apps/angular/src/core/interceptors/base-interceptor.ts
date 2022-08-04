import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

/** Interceptor to add the Api-Key. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  public constructor(private readonly config: AppConfigService) {}

  /** @inheritDoc */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    const newRequest = req.clone({
      headers: req.headers
        .set('Api-Key', this.config.apiKey),
    });
    return next.handle(newRequest);
  }
}

/** Interceptor to add the shared url. */
@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  public constructor(private readonly config: AppConfigService) {}

  /** @inheritDoc */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    const newRequest = req.clone({
      url: this.config.apiUrl + req.url,
    });
    return next.handle(newRequest);
  }
}
