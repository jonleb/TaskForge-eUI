import { Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { EUI_DATE_RANGE_SELECTOR } from "@eui/components/eui-date-range-selector";
import { DEFAULT_FORMATS } from '@eui/components/eui-datepicker';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'read-only',
    templateUrl: './component.html',
    imports: [...EUI_DATE_RANGE_SELECTOR],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],
})
export class ReadOnlyComponent {
    public startDate = new Date('06/08/2023');
    public endDate = new Date('06/15/2023');
}
