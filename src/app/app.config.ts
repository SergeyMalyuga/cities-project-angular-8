import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {appReducer} from './store/app/app.reducer';
import {OfferEffects} from './store/offer/effects/offer.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(appReducer),
    provideHttpClient(withInterceptorsFromDi()),
    provideEffects(OfferEffects),
  ],
};
