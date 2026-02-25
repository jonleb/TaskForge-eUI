# eui-date-range-selector

## Overview

<code class="eui-u-text-code">eui-date-range-selector</code> is a composition of two <code class="eui-u-text-code">euiInputText</code> fields wrapped under the Angular Material mat-date-range-input container and of an <code class="eui-u-text-code">euiButton</code> that triggers the mat-date-range-picker popup in order to select a range of dates.
Compared to the previous versions, the button that triggers the calendar popup is no more optional and the two input fields are wrapped under the border of the mat-date-range-input div container and they no longer open the popup upon clicking. This happened in order to give emphasis that this component picks a range of dates and it's not an individual start/end date selection as in the past.

<eui-alert euiWarning>
    <eui-alert-title>Removal of EuiDateRangeSelectorModule and the default DateAdapter provision</eui-alert-title>

    <p class="eui-u-text-paragraph">
        IMPORTANT NOTICE: In this version the <code class="eui-u-text-code">EuiDateRangeSelectorModule</code> has been removed in order to be able to import <code>eui-date-range-selector</code> as a standalone component. Along with the EuiDateRangeSelectorModule, the default provision of a DateAdapter(in previous versions it was MomentDateAdapter) is also gone. Thus, you need to make sure to provide the <strong>DateAdapter</strong> of your choice (MomentDateAdapter, NativeDateAdapter, LuxonDateAdapter, DateFnsAdapter, CustomDateAdapter) in your component providers, otherwise you will get the following error at runtime :
        <strong>ERROR: MatDatepicker: No provider found for MAT_DATE_FORMATS. You must add one of the following to your app config: provideNativeDateAdapter, provideDateFnsAdapter, provideLuxonDateAdapter, provideMomentDateAdapter, or provide a custom implementation.</strong>
    </p>
    <p>
        The date adapter selection reflects the date implementation you want to use in your app and impacts as well the supported locales and date formats. You can find a list of the available date adapters along with their import paths <a href="https://material.angular.dev/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings" target="_blank"> here</a> .
        The error will be also removed if you provide the MAT_DATE_FORMATS token with a useValue of the desired format. In that case and if you don't explicitly provide a DateAdapter, Angular will look for the closest DateAdapter provider in the injector tree, but in that case you won't know the opted adapter and thus the date implementation in your app. If no adapter is found (not in your app, not in a library(npm package), or test setup, a dynamic provider, or a build artifact), Angular Material adapter should default to NativeDateAdapter.
    </p>
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-date-range-selector' |
| Input | minDate | any | - |
| Input | maxDate | any | - |
| Input | togglerIconSvg | string | 'eui-calendar' |
| Input | togglerLabel | string | - |
| Input | firstInputPlaceholder | string | - |
| Input | secondInputPlaceholder | string | - |
| Input | firstInputAriaLabel | string | - |
| Input | secondInputAriaLabel | string | - |
| Input | startDateDefaultValue | any | - |
| Input | endDateDefaultValue | any | - |
| Input | comparisonStart | any | - |
| Input | comparisonEnd | any | - |
| Input | startView | 'month' \| 'year' \| 'multi-year' | 'month' |
| Input | startDateId | unknown | `start-date-${uniqueId()}` |
| Input | stepHours | number | 1 |
| Input | stepMinutes | number | 1 |
| Input | stepSeconds | number | 1 |
| Input | islongDateFormat | boolean | false |
| Input | isClearable | boolean | false |
| Input | isReadOnly | boolean | false |
| Input | isDisabled | boolean | false |
| Input | isResponsive | boolean | false |
| Input | isTimeRange | boolean | false |
| Input | hasSeconds | boolean | false |
| Output | firstSelectedDate | unknown | new EventEmitter<any>() |
| Output | secondSelectedDate | unknown | new EventEmitter<any>() |

## Samples

### [Default](samples/eui-date-range-selector/Default)

```html
<eui-date-range-selector></eui-date-range-selector>

<div class="doc-sample-section-title">With default values using [startDateDefaultValue] and [endDateDefaultValue]</div>
<eui-date-range-selector [startDateDefaultValue]="startDate" [endDateDefaultValue]="endDate"></eui-date-range-selector>
```

```typescript
import { Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { EUI_DATE_RANGE_SELECTOR } from "@eui/components/eui-date-range-selector";
import { DEFAULT_FORMATS } from '@eui/components/eui-datepicker';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_DATE_RANGE_SELECTOR],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ], 
})
export class DefaultComponent {

    public startDate = new Date('06/08/2023');
    public endDate = new Date('06/15/2023');
}
```

### Other examples

- [Options: Clearable](samples/eui-date-range-selector/clearable)
- [Options: Date Range Format](samples/eui-date-range-selector/date-format)
- [Options: Disabled](samples/eui-date-range-selector/disabled)
- [Options: Icon button](samples/eui-date-range-selector/icon-button)
- [Options: Placeholder](samples/eui-date-range-selector/placeholder)
- [Options: Read-only](samples/eui-date-range-selector/read-only)
- [Options: Responsive](samples/eui-date-range-selector/responsive)
- [Main features: Min & Max date](samples/eui-date-range-selector/minDate-maxDate)
- [Main features: Using isTimeRange](samples/eui-date-range-selector/timeRange)
- [Reactive forms: Reactive forms](samples/eui-date-range-selector/reactive-forms)
- [Event Handlers: firstSelectedDate/secondSelectedDate events](samples/eui-date-range-selector/events)
- [Misc: Custom selection](samples/eui-date-range-selector/custom-selection)
- [Misc: Starting view](samples/eui-date-range-selector/starting-view)

## Accessibility

<code class="eui-u-text-code">eui-date-range-selector</code> adds the <code class="eui-u-text-code">aria-haspopup</code> attribute to the toggle button which is an <code class="eui-u-text-code">eui-button</code> and triggers a calendar dialog with <code class="eui-u-text-code">role="dialog"</code>. <br>
The input fields have been given a meaningful label via the <code class="eui-u-text-code">aria-label</code> attributes that are binded to the <code class="eui-u-text-code">firstInputAriaLabel</code> and <code class="eui-u-text-code">secondInputAriaLabel</code>  respectively. These Input properties default to dd/mm/yyyy in order to announce the date format to the screen reader users before they start typing with the keyboard. The icon button, announces it's content through <code class="eui-u-text-code">aria-label="Open Calendar"</code> or through the <code class="eui-u-text-code">togglerLabel</code> if used. <br>
<div class="doc-sample-section-title">Keyboard interaction</div>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Alt + Down_Arrow</kbd></td>
            <td>Opens the calendar popup</td>
        <tr>
            <td><kbd class="eui-u-text-kbd">Esc</kbd></td>
            <td>Closes the calendar popup</td>
        </tr>
    </tbody>
</table>

<div class="row">
    <div class="col-4">
        <p class="eui-u-text-paragraph">In month view</p>
        <table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
            <thead>
                <tr>
                    <th>Shortcut</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Left_Arrow</kbd></td>
                    <td>Goes to previous day</td>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Right_Arrow</kbd></td>
                    <td>Goes to next day</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Up_Arrow</kbd></td>
                    <td>Goes to the same day in the previous week</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Down_Arrow</kbd></td>
                    <td>Goes to the same day in the next week</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Home</kbd></td>
                    <td>Goes to the first day of the month</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">End</kbd></td>
                    <td>Goes to the last day of the month</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Page_Up</kbd></td>
                    <td>Goes to the same day in the previous month</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Page_Down</kbd></td>
                    <td>Goes to the same day in the next month</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Alt + Page_Up</kbd></td>
                    <td>Goes to the same day in the previous year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Alt + Page_Down</kbd></td>
                    <td>Goes to the same day in the next year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Enter</kbd></td>
                    <td>Selects current date</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="col-4">
        <p class="eui-u-text-paragraph">In year view</p>
        <table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
            <thead>
                <tr>
                    <th>Shortcut</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Left_Arrow</kbd></td>
                    <td>Goes to previous month</td>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Right_Arrow</kbd></td>
                    <td>Goes to next month</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Up_Arrow</kbd></td>
                    <td>Goes up a row(back 4 months)</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Down_Arrow</kbd></td>
                    <td>Goes down a row(forward 4 months)</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Home</kbd></td>
                    <td>Goes to the first month of the year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">End</kbd></td>
                    <td>Goes to the last month of the year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Page_Up</kbd></td>
                    <td>Goes to the same month in the previous year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Page_Down</kbd></td>
                    <td>Goes to the same month in the next year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Alt + Page_Up</kbd></td>
                    <td>Goes to the same month 10 years back</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Alt + Page_Down</kbd></td>
                    <td>Goes to the same month 10 years forward</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Enter</kbd></td>
                    <td>Selects current month</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="col-4">
        <p class="eui-u-text-paragraph">In multi-year view</p>
        <table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
            <thead>
                <tr>
                    <th>Shortcut</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Left_Arrow</kbd></td>
                    <td>Goes to previous year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Right_Arrow</kbd></td>
                    <td>Goes to next year</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Up_Arrow</kbd></td>
                    <td>Goes up a row(back 4 years)</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Down_Arrow</kbd></td>
                    <td>Goes down a row(forward 4 years)</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Home</kbd></td>
                    <td>Goes to the first year in the current range</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">End</kbd></td>
                    <td>Goes to the last year in the current range</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Page_Up</kbd></td>
                    <td>Goes back 24 years</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Page_Down</kbd></td>
                    <td>Goes forward 24 years</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Alt + Page_Up</kbd></td>
                    <td>Goes back 240 years</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Alt + Page_Down</kbd></td>
                    <td>Goes forward 240 years</td>
                </tr>
                <tr>
                    <td><kbd class="eui-u-text-kbd">Enter</kbd></td>
                    <td>Selects current year</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<br>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
