import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {SortType} from '../../core/constants/const';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {NgClass} from '@angular/common';
import {AccessibilityClickDirective} from '../../shared/directives/accessibility-click.directive';
import {HoverTrackerDirective} from '../../shared/directives/hover-tracker.directive';

@Component({
  selector: 'app-places-sorting-form',
  imports: [
    ToggleDirective,
    NgClass,
    AccessibilityClickDirective,
    HoverTrackerDirective
  ],
  templateUrl: './places-sorting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesSortingFormComponent {
  @Input({required: true}) currentSortType!: SortType;
  @Output() clicked = new EventEmitter<SortType>();

  public sortType = Object.values(SortType);
  public isOptionOpen = signal<boolean>(false);

  public onToggled() {
    this.isOptionOpen.set(!this.isOptionOpen());
  }

  public closeOption() {
    this.isOptionOpen.set(false);
  }

  public onClicked(sortType: SortType) {
    this.clicked.emit(sortType);
    this.closeOption();
  }

  public onHovered(isHovered: boolean) {
    if (!isHovered) {
      this.isOptionOpen.set(false);
    }
  }
}
