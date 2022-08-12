import {
  Directive,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatSelect } from '@angular/material/select/';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, throttleTime } from 'rxjs/operators';

const BOTTOM_SCROLL_OFFSET = 25;

/** */
@Directive({
  selector: '[appMatSelectScrollBottom]',
})
export class MatSelectScrollBottomDirective implements OnDestroy {

  /** */
  @Output('appMatSelectScrollBottom') public reachedBottom = new EventEmitter<void>();

  // onPanelScrollEvent = event => { };

  /** */
  private unsubscribeAll$ = new Subject<boolean>();

  public constructor(private matSelect: MatSelect) {
    this.matSelect.openedChange
      .pipe(
        filter(isOpened => !!isOpened),
        switchMap(() =>
          fromEvent(this.matSelect.panel.nativeElement, 'scroll').pipe(
            throttleTime(50),
          )),
        takeUntil(this.unsubscribeAll$),
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((event: any) => {
        if (
          event.target.scrollTop >=
          event.target.scrollHeight -
          event.target.offsetHeight -
          BOTTOM_SCROLL_OFFSET
        ) {
          this.reachedBottom.emit();
        }
      });
  }

  /**  */
  public ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }
}
