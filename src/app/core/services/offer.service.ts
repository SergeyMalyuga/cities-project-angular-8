import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selector';
import {Router} from '@angular/router';
import {isAuth} from '../utils/auth-status';
import {toggleFavoriteOffer} from '../../store/favoritre-offer/actions/favorite-offer.actions';
import {AppRoute} from '../constants/const';
import {selectFavoriteOfferSuccessStatus} from '../../store/favoritre-offer/selectors/favorite-offer.selectors';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private store = inject(Store<AppState>);
  private authStatus = this.store.selectSignal(selectAuthStatus);
  private router = inject(Router);

  public toggleFavorite(offerId: string, isFavorite: boolean) {
    if (isAuth(this.authStatus())) {
      this.store.dispatch(toggleFavoriteOffer({offerId, isFavorite: !isFavorite}));
    } else {
      this.router.navigate([AppRoute.LOGIN]);
    }
    return this.store.select(selectFavoriteOfferSuccessStatus);
  }
}
