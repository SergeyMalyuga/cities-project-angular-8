import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {FavoriteOfferState} from '../../core/models/favorite-offer.state';
import {createReducer, on} from '@ngrx/store';
import {
  loadFavoriteOffers,
  loadFavoriteOffersFailure,
  loadFavoriteOffersSuccess
} from './actions/favorite-offer.actions';

export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
const initialState: FavoriteOfferState = favoriteOfferAdapter.getInitialState({
  isLoading: false,
  error: null,
  success: null
});

export const favoriteOfferReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, state => ({
    ...state, isLoading: true, success: null
  })),
  on(loadFavoriteOffersSuccess, (state, {offers}) =>
    favoriteOfferAdapter.setAll(offers, {...state, isLoading: false, error: null, success: true})),
  on(loadFavoriteOffersFailure, (state, {error}) => ({
    ...state, isLoading: false, error, success: false
  }))
);
