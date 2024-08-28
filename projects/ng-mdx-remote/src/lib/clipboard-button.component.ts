import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component,HostListener } from '@angular/core';
import { merge, of, Subject, timer,Observable,BehaviorSubject} from 'rxjs';
import { map,shareReplay, startWith, switchMap, distinctUntilChanged } from 'rxjs/operators';

const BUTTON_TEXT_COPY = 'Copy';
const BUTTON_TEXT_COPIED = 'Copied';

@Component({
  selector: 'ng-mdx-remote-clipboard',
  template: `
    <button
      class="ng-mdx-remote-clipboard-button"
      [class.copied]="copied$ | async"
      (click)="onCopyToClipboardClick()"
    >{{ copiedText$ | async }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
})
export class ClipboardButtonComponent {
  private _buttonClick$ = new Subject<void>();
  private _hovered$ = new BehaviorSubject<boolean>(false);

  readonly copied$: Observable<boolean>;
  readonly copiedText$: Observable<string>;

  constructor() {
    this.copied$ = this._buttonClick$.pipe(
      switchMap(() => {
        return merge(
          of(true),
          this._hovered$.pipe(
            startWith(false),
            switchMap(hovered => {
              const duration = hovered ? 3000 : 0; 
              return timer(duration).pipe(
                map(() => false)
              );
            })
          )
        );
      }),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.copiedText$ = this.copied$.pipe(
      startWith(false),
      map(copied => copied ? BUTTON_TEXT_COPIED : BUTTON_TEXT_COPY)
    );
  }

  @HostListener('click')
  onCopyToClipboardClick(): void {
    this._buttonClick$.next();
  }

  @HostListener('mouseover')
  onMouseOver(): void {
    this._hovered$.next(true);
  }

  @HostListener('mouseout')
  onMouseOut(): void {
    this._hovered$.next(false);
  }
}