import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {getWidthByRating} from '../../../core/utils/width-by-rating';
import {NgClass, TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker.directive';
import {OfferService} from '../../../core/services/offer.service';
import {first, tap} from 'rxjs';
import {isAuth} from '../../../core/utils/auth-status';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus} from '../../../store/user/selectors/user.selector';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../../core/constants/const';

@Component({
  selector: 'app-offer-card',
  imports: [
    TitleCasePipe,
    HoverTrackerDirective,
    NgClass,
    RouterLink
  ],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Input() isHoverEnable = false;
  @Output() hovered = new EventEmitter<OfferPreview | null>();

  private store = inject(Store<AppState>);
  private offerService = inject(OfferService);

  protected readonly getWidthByRating = getWidthByRating;
  protected readonly isAuth = isAuth;

  public isLoading = signal<boolean>(false);
  public authStatus = this.store.selectSignal(selectAuthStatus);

  public onHovered(isHover: boolean) {
    if (isHover) {
      this.hovered.emit(this.offer)
    } else {
      this.hovered.emit(null);
    }
  }

  public toggleFavorite() {
    this.isLoading.set(true);
    this.offerService.toggleFavorite(this.offer.id, this.offer.isFavorite).pipe(
      first(success => success !== null),
      tap(() => this.isLoading.set(false)))
      .subscribe();
  }

  protected readonly AppRoute = AppRoute;
}
