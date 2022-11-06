// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: "AIzaSyCfU5i1TCsGuRE_LY061J_WMyL1IalHCKg",
    authDomain: "inzynierka-8fde0.firebaseapp.com",
    databaseURL: "https://inzynierka-8fde0-default-rtdb.firebaseio.com",
    projectId: "inzynierka-8fde0",
    storageBucket: "inzynierka-8fde0.appspot.com",
    messagingSenderId: "963490485530",
    appId: "1:963490485530:web:0eb7903198c9feb0f788a3",
    measurementId: "G-TMNN7RPLFH"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
