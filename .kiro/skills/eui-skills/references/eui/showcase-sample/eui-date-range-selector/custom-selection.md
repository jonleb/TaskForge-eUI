---
description: Uses a custom selection strategy to automatically pick a fixed five-day range.
id: custom-selection
---

```html
<div class="doc-sample-section-title">With five days range selection</div>
<eui-date-range-selector />
```

```typescript
import { ChangeDetectionStrategy, Component, Injectable, inject } from "@angular/core";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter } from '@angular/material/core';
import {
    MatDateRangeSelectionStrategy,
    DateRange,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

import { EUI_DATE_RANGE_SELECTOR } from "@eui/components/eui-date-range-selector";
import { DEFAULT_FORMATS } from "@eui/components/eui-datepicker";

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
    private _dateAdapter = inject<DateAdapter<D>>(DateAdapter);


    selectionFinished(date: D | null): DateRange<D> {
        return this._createFiveDayRange(date);
    }

    createPreview(activeDate: D | null): DateRange<D> {
        return this._createFiveDayRange(activeDate);
    }

    private _createFiveDayRange(date: D | null): DateRange<D> {
        if (date) {
            const start = this._dateAdapter.addCalendarDays(date, -2);
            const end = this._dateAdapter.addCalendarDays(date, 2);
            return new DateRange<D>(start, end);
        }

        return new DateRange<D>(null, null);
    }
}


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'custom-selection',
    templateUrl: 'component.html',
    providers: [{
        provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
        useClass: FiveDayRangeSelectionStrategy,
        },
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],
    imports: [...EUI_DATE_RANGE_SELECTOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectionComponent {

}
```

