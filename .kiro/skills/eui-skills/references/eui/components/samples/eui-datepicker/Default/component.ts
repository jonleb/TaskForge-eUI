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
