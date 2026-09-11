import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';
import {HttpErrorResponse} from '@angular/common/http';

export const loadFavoriteOffers = createAction('[Favorite Offer] Load Favorite Offers');
export const loadFavoriteOffersSuccess = createAction('[Favorite Offer] Load Favorite Offers Success',
  props<{ offers: OfferPreview[] }>());
export const loadFavoriteOffersFailure = createAction('[Favorite Offer] Load Favorite Offers Failure',
  props<{ error: HttpErrorResponse }>());
