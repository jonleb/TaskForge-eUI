import { Component } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'dataRefresh',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE, ...EUI_BUTTON],
})
export class DataRefreshComponent {

    valueToChange = 50;

    changeValue() {
        this.valueToChange = Math.floor(Math.random() * 100) + 1;
    }
}
