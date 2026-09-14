import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Offer} from '../../core/models/offers';
import {catchError, combineLatest, EMPTY, filter, map, merge, Subject, switchMap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {OfferDataService} from '../../core/services/offer-data.service';
import {AppRoute} from '../../core/constants/const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {getWidthByRating} from '../../core/utils/width-by-rating';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    TitleCasePipe
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent implements OnInit {
  private refreshOffer$ = new Subject<void>();
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private offerDataService = inject(OfferDataService);
  private destroyRef = inject(DestroyRef);

  public offer = signal<Offer | null>(null);
  public offerId = computed(() => this.offer()?.id ?? null);

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map(params => params.get('id')),
      filter((id): id is string => id !== null),
      switchMap(id => {

        const offer$ = merge(
          this.offerDataService.getOfferById(id),
          this.refreshOffer$.pipe(switchMap(() => this.offerDataService.getOfferById(id).pipe(
            catchError(() => {
              return EMPTY;
              this.router.navigate([AppRoute.MAIN])
            })))));

        return combineLatest({
          offer: offer$
        })
      }), takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.offer.set(result.offer)
      })
  }

  protected readonly getWidthByRating = getWidthByRating;
}
