import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus, selectUserEmail} from '../../../store/user/selectors/user.selector';
import {isAuth} from '../../../core/utils/auth-status';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../../core/constants/const';
import {selectFavoriteOffersTotal} from '../../../store/favoritre-offer/selectors/favorite-offer.selectors';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private store = inject(Store<AppState>);

  protected readonly isAuth = isAuth;
  protected readonly AppRoute = AppRoute;

  public offersTotal = this.store.selectSignal(selectFavoriteOffersTotal);
  public authStatus = this.store.selectSignal(selectAuthStatus);
  public email = this.store.selectSignal(selectUserEmail);
}
