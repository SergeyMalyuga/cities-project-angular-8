import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {SortType} from '../../../core/constants/const';

@Pipe({
  name: 'sortOfferBy'
})
export class SortOfferByPipe implements PipeTransform {
  transform(offers: OfferPreview[], sortType: SortType): OfferPreview[] {
    if (offers && offers.length > 0) {
      switch (sortType) {
        case SortType.PRICE_LOW_TO_HIGH: {
          return [...offers].sort((a, b) => a.price - b.price);
        }
        case SortType.PRICE_HIGH_TO_LOW: {
          return [...offers].sort((a, b) => b.price - a.price);
        }
        case SortType.TOP_RATED_FIRST: {
          return [...offers].sort((a, b) => b.rating - a.rating);
        }
        default: {
          return [...offers];
        }
      }
    }
    return [];
  }
}
