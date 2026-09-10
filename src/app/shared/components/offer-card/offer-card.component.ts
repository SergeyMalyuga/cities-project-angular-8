import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {getWidthByRating} from '../../../core/utils/width-by-rating';
import {TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker.directive';

@Component({
  selector: 'app-offer-card',
  imports: [
    TitleCasePipe,
    HoverTrackerDirective
  ],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Input() isHoverEnable = false;

  @Output() hovered = new EventEmitter<OfferPreview | null>();

  protected readonly getWidthByRating = getWidthByRating;

  public onHovered(isHover: boolean) {
    if (isHover) {
      this.hovered.emit(this.offer)
    } else {
      this.hovered.emit(null);
    }
  }
}
