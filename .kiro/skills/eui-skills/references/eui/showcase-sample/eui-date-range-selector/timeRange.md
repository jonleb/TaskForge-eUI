---
description: Shows time-enabled range selection with optional seconds and custom step sizes, bound to reactive forms.
id: timeRange
---

```html
<div class="doc-sample-section-title">Using isTimeRange to integrate the timerange component</div>
<div class="row">
    <div class="col">
        <eui-slide-toggle (slideToggleChange)="onClearToggle()" [isChecked]="isClearable" /> Toggle isClearable
    </div>
    <div class="col">
        <div class="doc-sample-section-title">Form value in json(0-based UTC) format</div>
    </div>
</div>


<form [formGroup]="form">
    <div class="row">
        <div class="col">
            <eui-date-range-selector isTimeRange [isReadOnly]="isReadonly" [isClearable]="isClearable" formControlName="timerange" />
        </div>

        <div class="col">
            <pre class="eui-u-text-pre">{{ form.value | json }}</pre>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <button euiButton euiPrimary (click)="onResetForm($event)" class="eui-u-mr-xs">Reset</button>
            <button euiButton euiPrimary (click)="onDisableField($event)" class="eui-u-mr-xs">Toggle disabled</button>
            <button euiButton euiPrimary (click)="isReadonly = !isReadonly" class="eui-u-mr-xs">Toggle readonly</button>
            <button euiButton euiPrimary (click)="onChangeValue()">Change value</button>
        </div>
    </div>
</form>

<div class="doc-sample-section-title">Using hasSeconds to show a third column with seconds</div>
<form [formGroup]="form2">
    <div class="row">
        <div class="col">
            <eui-date-range-selector isTimeRange hasSeconds secondsFormat formControlName="withSeconds" isClearable />
        </div>

        <div class="col">
            <pre class="eui-u-text-pre">{{ form2.value | json }}</pre>
        </div>
    </div>
</form>

<div class="doc-sample-section-title">Using steps of 10 for hours and 20 for minutes/seconds</div>
<form [formGroup]="form5">
    <div class="row">
        <div class="col">
            <eui-date-range-selector isTimeRange hasSeconds secondsFormat [stepHours]="10" [stepMinutes]="20" [stepSeconds]="20" formControlName="withSteps" />
        </div>

        <div class="col">
            <pre class="eui-u-text-pre">{{ form5.value | json }}</pre>
        </div>
    </div>
</form>
```

```typescript
import { ChangeDetectionStrategy, Component, Directive, OnInit, inject } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_DATE_RANGE_SELECTOR, EuiDateRangeSelectorDates } from '@eui/components/eui-date-range-selector';

export const TIME_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY HH:mm',
    },
    display: {
        dateInput: 'DD/MM/YYYY HH:mm',
        monthYearLabel: 'DD/MM/YYYY HH:mm',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'DD/MM/YYYY HH:mm',
    },
};

export const TIME_FORMAT_SECS = {
    parse: {
        dateInput: 'DD/MM/YYYY HH:mm:ss',
    },
    display: {
        dateInput: 'DD/MM/YYYY HH:mm:ss',
        monthYearLabel: 'DD/MM/YYYY HH:mm:ss',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'DD/MM/YYYY HH:mm:ss',
    },
};
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[secondsFormat]',
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: TIME_FORMAT_SECS },
    ],
})
export class SecondsFormatDirective {
}


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'isTimeRange',
    templateUrl: './component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_BUTTON,
        SecondsFormatDirective,
        JsonPipe,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: TIME_FORMAT },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeRangeComponent implements OnInit {
    private fb = inject(FormBuilder);

    public form: FormGroup;
    public form2: FormGroup;
    public form5: FormGroup;
    public isClearable = false;
    fixedDate= new Date('06/08/1987');
    fiveDaysBefore = new Date('06/08/1987').setDate(new Date('06/08/1987').getDate() - 5);
    fiveDaysAfter = new Date('06/08/1987').setDate(new Date('06/08/1987').getDate() + 5);
    public isReadonly = false;

    ngOnInit() {
        this.form = this.fb.group({
            timerange: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [Validators.required]),
        });

        this.form2 = this.fb.group({
            withSeconds: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [Validators.required]),
        });
        this.form5 = this.fb.group({
            withSteps: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [Validators.required]),
        });
    }

    public onResetForm(event: any) {
        this.form.reset();
    }

    public onDisableField(event: any) {
        const formControl = this.form.get('timerange');
        if(formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }

    public onClearToggle() {
        this.isClearable = !this.isClearable;
    }

    public onChangeValue() {
        const value: EuiDateRangeSelectorDates = {
            startRange: new Date(this.fiveDaysBefore),
            endRange: new Date(this.fiveDaysAfter) };
        this.form.get('timerange').setValue(value);
    }
}
```

