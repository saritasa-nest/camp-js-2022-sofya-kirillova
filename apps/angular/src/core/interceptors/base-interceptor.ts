import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

/** Interceptor to add the Api-Key. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  /** @inheritDoc */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    const newRequest = req.clone({
      headers: req.headers
        .set('Api-Key', environment.apiKey),
    });
    return next.handle(newRequest);
  }
}

/** Interceptor to add the shared url. */
@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  /** @inheritDoc */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    const newRequest = req.clone({
      url: environment.apiUrl + req.url,
    });
    return next.handle(newRequest);
  }
}
