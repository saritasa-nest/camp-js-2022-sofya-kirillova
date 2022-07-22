// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from '@angular/common/http';

// import { getAppVersion } from './version';

export const environment = {
  production: false,
  // apiUrl: process.env.NG_APP_API_URL,
  apiUrl: 'https://api.camp-js.saritasa.rocks/api/v1',
  // version: getAppVersion('dev'),

};
export const httpOptions = {
  headers: new HttpHeaders({
    // [API_KEY]: process.env.NG_APP_API_KEY,
  }),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
