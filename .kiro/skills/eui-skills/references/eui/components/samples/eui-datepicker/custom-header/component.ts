import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'custom-header',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER, ...EUI_ALERT],
    providers: [
       provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class CustomHeaderComponent {
    customHeaderClass = CustomHeaderExampleComponent;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'example-header',
    styles: [`
        .example-header {
            display: flex;
            align-items: center;
            padding: 0.5em;
        }
        .example-header-label {
            flex: 1;
            height: 1em;
            font-weight: 500;
            text-align: center;
        }
        button:hover {
            cursor:pointer
        }
    `],
    template: `
      <div class="example-header">
        <button euiButton euiIconButton euiSizeS class="eui-u-mr-m eui-u-mb-s" title="Previous Year" (click)="previousClicked('year')">
            <eui-icon-svg aria-label="Previous Year" icon="eui-caret-first"/>
        </button>
        <button euiButton euiIconButton euiSizeS class="eui-u-mr-m eui-u-mb-s" title="Previous Month" (click)="previousClicked('month')">
            <eui-icon-svg aria-label="Previous Year" icon="eui-caret-left"/>
        </button>
        <span class="example-header-label">{{periodLabel}}</span>
        <button euiButton euiIconButton euiSizeS class="eui-u-mr-m eui-u-mb-s" title="Next Month" (click)="nextClicked('month')">
            <eui-icon-svg aria-label="Previous Year" icon="eui-caret-right"/>
        </button>
        <button euiButton euiIconButton euiSizeS class="eui-u-mr-m eui-u-mb-s" title="Next Year" (click)="nextClicked('year')">
            <eui-icon-svg aria-label="Previous Year" icon="eui-caret-last"/>
        </button>
      </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...EUI_ICON, ...EUI_BUTTON]
})
  export class CustomHeaderExampleComponent<D> implements OnDestroy {
    private _destroyed = new Subject<void>();

    constructor(
        private _calendar: MatCalendar<D>, private _dateAdapter: DateAdapter<D>,
        @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats, cdr: ChangeDetectorRef) {
        _calendar.stateChanges
          .pipe(takeUntil(this._destroyed))
          .subscribe(() => cdr.markForCheck());
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    get periodLabel() {
        return this._dateAdapter
            .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
            .toLocaleUpperCase();
    }

    previousClicked(mode: 'month' | 'year') {
        this._calendar.activeDate = mode === 'month' ?
            this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1) :
            this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
    }

    nextClicked(mode: 'month' | 'year') {
        this._calendar.activeDate = mode === 'month' ?
            this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1) :
            this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
    }
}
