import { Component, ViewEncapsulation } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'highlight-dates',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
    styles: [`
    button.example-custom-date-class {
        background: orange;
        border-radius: 100%;
      }
    `],
    encapsulation: ViewEncapsulation.None,
})
export class HighLightDatesComponent {

    orangeClass: MatCalendarCellClassFunction<any> = (cellDate, view) => {
        // Only highligh dates inside the month view.
        if (view === 'month') {
            cellDate = cellDate.toDate();
            const date = cellDate.getDate();

            // Highlight the 1st and 20th day of each month.
            return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
        }

        return '';
    };
}
