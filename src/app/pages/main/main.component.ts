import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {AppState} from '../../core/models/app.state';
import {Store} from '@ngrx/store';
import {selectCurrentCity, selectOffersByCity} from '../../store/app/selectors/app.selectors';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {CITY_LOCATIONS, SortType} from '../../core/constants/const';
import {NgClass} from '@angular/common';
import {City} from '../../core/models/city';
import {changeCity} from '../../store/city/actions/city.actions';
import {PlacesSortingFormComponent} from '../../components/places-sorting-form/places-sorting-form.component';
import {SortOfferByPipe} from './pipes/sort-offer-by.pipe';
import {OfferPreview} from '../../core/models/offers';
import {MapComponent} from '../../shared/components/map/map.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    OfferCardComponent,
    NgClass,
    PlacesSortingFormComponent,
    SortOfferByPipe,
    MapComponent
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  private store = inject(Store<AppState>);

  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;

  public offers = this.store.selectSignal(selectOffersByCity);
  public offersTotal = computed(() => this.offers().length);
  public currentCity = this.store.selectSignal(selectCurrentCity);
  public currentSortType = signal<SortType>(SortType.POPULAR);
  public activeCard = signal<OfferPreview | null>(null);

  public isActiveCity(city: City): boolean {
    return city.name === this.currentCity().name
  }

  public changeCity(city: City): void {
    this.store.dispatch(changeCity({city}));
  }

  public changeSortType(sortType: SortType): void {
    this.currentSortType.set(sortType);
  }

  public changeActiveCard(offer: OfferPreview | null): void {
    this.activeCard.set(offer);
  }
}
