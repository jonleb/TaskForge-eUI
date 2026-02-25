import { Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";
import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'icon',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER, ...EUI_SLIDE_TOGGLE],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class IconComponent {
    date = new Date('06/08/1987');
    public isClearable = true;

    public onClearToggle() {
        this.isClearable = !this.isClearable;
    }
}
