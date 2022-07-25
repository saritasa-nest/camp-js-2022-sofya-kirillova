// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: process.env.NG_APP_API_URL,
  apiKey: process.env.NG_APP_API_KEY,

  // apiUrl: 'https://api.camp-js.saritasa.rocks/api/v1',
  // apiKey: '3df19916-03c9-47de-ab5c-5619376c2cef',
};

// apiUrl: process.env.NG_APP_API_URL,
// version: getAppVersion('dev'),
// apiUrl: 'https://api.camp-js.saritasa.rocks/api/v1',
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
