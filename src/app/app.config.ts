import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {appReducer} from './store/app/app.reducer';
import {OfferEffects} from './store/offer/effects/offer.effects';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {UserEffects} from './store/user/effects/user.effects';
import {FavoriteOfferEffects} from './store/favoritre-offer/effects/favorite-offer.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(appReducer),
    provideHttpClient(withInterceptorsFromDi()),
    provideEffects(OfferEffects, UserEffects, FavoriteOfferEffects),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
};
