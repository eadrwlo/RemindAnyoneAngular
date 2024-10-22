import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { firebaseConfig } from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideDatabase(() => getDatabase())
  ]
};
