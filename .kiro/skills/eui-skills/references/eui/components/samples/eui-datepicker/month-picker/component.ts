import { Component } from '@angular/core';
import { Moment } from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'monthPicker',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class MonthPickerComponent {

    public selectedDate = '';
    public inputDate = '';
    public selectedDate2 = '';
    public inputDate2 = '';

    public onDateSelected(e: Moment) {
        this.selectedDate = e.toISOString();
    }

    public onInputChanged(e: Moment) {
        this.inputDate = e.toISOString();
    }

    public onDateSelected2(e: string) {
        this.selectedDate2 = e;
    }

    public onInputChanged2(e: string) {
        this.inputDate2 = e;
    }
}
