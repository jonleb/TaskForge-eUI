import { Component, inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment-timezone';
import { Moment } from 'moment-timezone';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";
import { EUI_ALERT } from '@eui/components/eui-alert';

@Injectable()
export class CustomMomentDateAdapter extends MomentDateAdapter {

    static TIMEZONE = 'Asia/Tokyo'; // Set this to Europe/Brussels in order to force the Brussel's timezone

    createDate(year: number, month: number, date: number): Moment {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error(
                `Invalid month index "${month}". Month index has to be between 0 and 11.`,
            );
        }

        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }

        const monthString = ('0' + (month + 1)).slice(-2);
        const dateString = ('0' + date).slice(-2);
        const fullDateString = `${year}-${monthString}-${dateString} 00:00`;
        const result = moment.tz(fullDateString, CustomMomentDateAdapter.TIMEZONE);

        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }

        return result;
    }

    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    deserialize(value: any): Moment | null {
        let date: Moment | undefined;
        if (value instanceof Date) {
            date = this._createMoment2(value).locale(this.locale);
        } else if (this.isDateInstance(value)) {
            // Note: assumes that cloning also sets the correct locale.
            return this.clone(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this._createMoment2(value, moment.ISO_8601).locale(this.locale);
        }
        if (date && this.isValid(date)) {
            return this._createMoment2(date).locale(this.locale);
        }
        return super.deserialize(value);
    }

    parse(value: any, parseFormat: string | string[]): Moment | null {
        if (value && typeof value === 'string') {
            return this._createMoment2(value, parseFormat, this.locale);
        }
        return value ? this._createMoment2(value).locale(this.locale) : null;
    }

    today(): Moment {
        return moment.default()
            .utc()
            .tz(CustomMomentDateAdapter.TIMEZONE)
            .locale(this.locale);
    }

    /** Creates a Moment instance while respecting the current UTC settings. */
    private _createMoment2(
        date: moment.MomentInput,
        format?: moment.MomentFormatSpecification,
        locale?: string,
    ): Moment {
        const date2 = moment.default(date, format, locale).format('DD-MM-YYYY');
        return moment.tz(date2, 'DD-MM-YYYY', CustomMomentDateAdapter.TIMEZONE);
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'force-timezone',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER, ...EUI_ALERT],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
        { provide: DateAdapter, useClass: CustomMomentDateAdapter },
    ],
})
export class ForceTimezoneComponent {

    selectedDate = 'No selected date';

    public onDateSelected(e: Moment) {
        this.selectedDate = e.toISOString();
    }
}
