# eui-datepicker

## Overview

<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">eui-datepicker</code> component is a highly configurable component which allows interactive visual
    calendar date picker functionality to your pages.
    You can customize the date format, the language, restrict the selectable date ranges, add custom buttons, etc.
</p>
<p class="eui-u-text-paragraph">
    By default, the datepicker calendar opens in a small overlay (full screen in mobile) when the associated button gets
    clicked or on 'Enter' key press when the input field is focused.
</p>
<p class="eui-u-text-paragraph">
    It is build on a composition of eUI components, and specifically it's an <code
        class="eui-u-text-code">eui-input-group</code> which encompasses an <code
        class="eui-u-text-code">euiInputText</code> along with an <code class="eui-u-text-code">euiButton</code> that
    both trigger the Angular Material <code class="eui-u-text-code">mat-datepicker</code> calendar popup.
    Increased awareness has been given on accessibility improvements both in terms of keyboard navigation but also of
    announcing the elements to the assistive technologies.
    You can find more details related to accessibility on the corresponding A11Y section.
</p>
<p class="eui-u-text-paragraph">
    Moreover, in this version you will find new features such as: The <code class="eui-u-text-code">dateClass</code>
    attribute that can be used to highlight specific dates, the option to select a date using <strong>action
        buttons</strong> and also the option named <strong>isShownOnInputClick</strong> that controls the visibility of
    the calendar popup when the input field is clicked.
    Last but not least, in this version the <code class="eui-u-text-code">MomentDateAdapter</code> is neither
    forced at component level, nor provided as the default adapter at module level as it was in previous versions, which gives you the added value of providing a custom
    adapter of your choice in your providers array. More details on this can be found in the "Changing the default
    date adapter" examples of the "OPTIONS & SAMPLES" section.
</p>
<eui-alert euiWarning>
    <eui-alert-title>Removal of EuiDatepickerModule and the default DateAdapter provision</eui-alert-title>

    <p class="eui-u-text-paragraph">
        IMPORTANT NOTICE: In this version the <code class="eui-u-text-code">EuiDatepickerModule</code> has been removed in order to be able to import <code>eui-datepicker</code> as a standalone component. Along with the EuiDatepickerModule, the default provision of a DateAdapter(in previous versions it was MomentDateAdapter) is also gone. Thus, you need to make sure to provide the <strong>DateAdapter</strong> of your choice (MomentDateAdapter, NativeDateAdapter, LuxonDateAdapter, DateFnsAdapter, CustomDateAdapter) in your component providers, otherwise you will get the following error at runtime :
        <strong>ERROR: MatDatepicker: No provider found for MAT_DATE_FORMATS. You must add one of the following to your app config: provideNativeDateAdapter, provideDateFnsAdapter, provideLuxonDateAdapter, provideMomentDateAdapter, or provide a custom implementation.</strong>
    </p>
    <p>
        The date adapter selection reflects the date implementation you want to use in your app and impacts as well the supported locales and date formats. You can find a list of the available date adapters along with their import paths <a href="https://material.angular.dev/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings" target="_blank"> here</a> .
        The error will be also removed if you provide the MAT_DATE_FORMATS token with a useValue of the desired format. In that case and if you don't explicitly provide a DateAdapter, Angular will look for the closest DateAdapter provider in the injector tree, but in that case you won't know the opted adapter and thus the date implementation in your app. If no adapter is found (not in your app, not in a library(npm package), or test setup, a dynamic provider, or a build artifact), Angular Material adapter should default to NativeDateAdapter.
    </p>
</eui-alert>

<eui-alert euiWarning>
    <eui-alert-title>moment-timezone has been removed</eui-alert-title>

    <p class="eui-u-text-paragraph">
        <code class="eui-u-text-code">moment-timezone</code> has been removed as a dependency of the eUI package. If your application uses it (i.e. in case you need to force specific timezones), you need to install it separately.
    </p>
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | value | any | - |
| Input | togglerIconSvg | string | 'eui-calendar' |
| Input | togglerLabel | string | - |
| Input | placeholder | string | - |
| Input | type | 'year' \| 'month' \| 'regular' | 'regular' |
| Input | startView | 'month' \| 'year' \| 'multi-year' | - |
| Input | minDate | any | - |
| Input | maxDate | any | - |
| Input | datepickerFilter | (d: any) | > boolean = this.datepickerFiltering |
| Input | dateOutputFormat | string | - |
| Input | customHeader | any | - |
| Input | dateClass | MatCalendarCellClassFunction<any> | - |
| Input | stepHours | number | 1 |
| Input | stepMinutes | number | 1 |
| Input | stepSeconds | number | 1 |
| Input | inputId | unknown | `eui-datepicker-${uniqueId()}` |
| Input | customPanelClass | string \| string[] \| null | null |
| Input | isDatetimepicker | boolean | false |
| Input | hasSeconds | boolean | false |
| Input | isOneInputField | boolean | false |
| Input | hasNoButton | boolean | false |
| Input | isDatepickerBlock | boolean | false |
| Input | isReadOnly | boolean | false |
| Input | isDisabled | boolean | false |
| Input | isInputDisabled | boolean | false |
| Input | isButtonDisabled | boolean | false |
| Input | isPickerDisabled | boolean | false |
| Input | isShownOnInputClick | boolean | true |
| Input | get | unknown | - |
| Input | get | unknown | - |
| Output | inputChange | unknown | new EventEmitter<any>() |
| Output | dateSelect | unknown | new EventEmitter<any>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant |

## Samples

### [Default](samples/eui-datepicker/Default)

```html
<eui-datepicker></eui-datepicker>

<div class="doc-sample-section-title">With NgModel</div>
<eui-datepicker [ngModel]="model_value"></eui-datepicker>


<div class="doc-sample-section-title">With default values (responsive)</div>
<div class="row">
    <div class="col-md-6">
        Start date
        <eui-datepicker [value]="valueDate"></eui-datepicker>
    </div>
    <div class="col-md-6">
        End date
        <eui-datepicker [value]="valueDate2"></eui-datepicker>
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: './component.html',
    imports: [FormsModule, ...EUI_DATEPICKER],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class DefaultComponent {
    public valueDate = new Date('06/08/1987');
    public valueDate2 = this._addDays( this.valueDate, 7 );
    public model_value = this._addDays( this.valueDate, 90 );

    private _addDays( date: Date, days: number ): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
```

### Other examples

- [Options: Custom icon](samples/eui-datepicker/icon)
- [Options: Custom placeholder](samples/eui-datepicker/placeholder)
- [Options: Date format](samples/eui-datepicker/date-format)
- [Options: isDisabled](samples/eui-datepicker/isDisabled)
- [Options: isReadOnly](samples/eui-datepicker/isReadOnly)
- [Options: Responsive](samples/eui-datepicker/responsive)
- [Main features: isDatetimepicker](samples/eui-datepicker/isDatetimepicker)
- [Main features: Mobile mode](samples/eui-datepicker/mobile)
- [Main features: Month picker](samples/eui-datepicker/month-picker)
- [Main features: Restricted date range](samples/eui-datepicker/retrict-date-range)
- [Main features: Year picker](samples/eui-datepicker/year-picker)
- [Date Adapter: Adapter to change the first day of the week](samples/eui-datepicker/custom-adapter-first-day)
- [Date Adapter: Using the NativeDateAdapter](samples/eui-datepicker/changing-adapter)
- [Date Adapter: Custom Adapter to force specific timezones](samples/eui-datepicker/custom-adapter-force-timezone)
- [Date Adapter: Utc dates](samples/eui-datepicker/useUtc)
- [Reactive forms: Reactive forms](samples/eui-datepicker/reactive-forms)
- [Event Handlers: Using dateSelect and inputChange events](samples/eui-datepicker/event-handlers)
- [Misc: Action Buttons](samples/eui-datepicker/action-buttons)
- [Misc: Custom header](samples/eui-datepicker/custom-header)
- [Misc: Highlight Dates](samples/eui-datepicker/highlight-dates)
- [Misc: With isShownOnInputClick set to false](samples/eui-datepicker/isShownOnInputClick)
- [Misc: Regular expressions](samples/eui-datepicker/restrict-to-regex)

## Accessibility

<p class="eui-u-text-paragraph">
    <code class="eui-u-text-code">eui-date-picker</code> adds the <code class="eui-u-text-code">aria-haspopup</code>
    attribute to the native input element and toggle button (if used) respectively, and triggers a calendar dialog with
    <code class="eui-u-text-code">role="dialog"</code>.
</p>
<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">input</code> html element is announced to the Assistive Technologies(screen
    readers) via an <code class="eui-u-text-code">aria-label</code> attribute.
</p>
<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">button</code> either announces it's content through an <code
        class="eui-u-text-code">aria-label</code> attribute in case an icon is used or by announcing the content of the
    <code class="eui-u-text-code">togglerLabel</code>.
</p>

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
            <td><kbd class="eui-u-text-kbd">Enter / Alt + Down_Arrow</kbd></td>
            <td>Opens the calendar popup</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Esc</kbd></td>
            <td>Closes the calendar popup</td>
        </tr>
    </tbody>
</table>

<div class="row eui-u-flex-wrap">
    <div class="col">
        <h5 class="eui-u-text-h5 eui-u-mb-s">In month view</h5>
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
                </tr>
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
    <div class="col">
        <h5 class="eui-u-text-h5 eui-u-mb-s">In year view</h5>
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
                </tr>
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
    <div class="col">
        <h5 class="eui-u-text-h5 eui-u-mb-s">In multi-year view</h5>
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
