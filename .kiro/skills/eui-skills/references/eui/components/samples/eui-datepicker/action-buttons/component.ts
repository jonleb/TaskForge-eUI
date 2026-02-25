import { Component, ViewChild } from '@angular/core';

import { DEFAULT_FORMATS, EUI_DATEPICKER, EuiDatepickerComponent } from "@eui/components/eui-datepicker";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'action-buttons',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER, ...EUI_BUTTON, ...EUI_ICON],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class ActionButtonsComponent {

    @ViewChild('dpRef') datepickerRef: EuiDatepickerComponent;
    @ViewChild('dpRef2') datepickerRef2: EuiDatepickerComponent;

    onCancel() {
        this.datepickerRef.closeCalendar();
    }

    onApply() {
        this.datepickerRef.onDateSelectApply();
    }

    onCancel2() {
        this.datepickerRef2.closeCalendar();
    }

    onApply2() {
        this.datepickerRef2.onDateSelectApply();
    }

    onToday() {
        this.datepickerRef2.selectToday();
        this.datepickerRef2.closeCalendar();
    }
}
