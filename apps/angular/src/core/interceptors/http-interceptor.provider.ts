import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor, UrlInterceptor } from './base-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
];
