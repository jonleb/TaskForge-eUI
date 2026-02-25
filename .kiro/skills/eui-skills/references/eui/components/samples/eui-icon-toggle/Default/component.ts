import { Component } from '@angular/core';

import { EUI_ICON_TOGGLE } from "@eui/components/eui-icon-toggle";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ICON_TOGGLE],
})
export class DefaultComponent {
}
