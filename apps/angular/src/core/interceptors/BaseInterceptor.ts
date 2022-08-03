import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

/** Base option interceptor. */
@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  /** @inheritDoc */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    const newRequest = req.clone({
      headers: req.headers
        .set('Api-Key', environment.apiKey),
      url: environment.apiUrl + req.url,
    });
    return next.handle(newRequest);
  }
}
