import { Component } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_CARD } from "@eui/components/eui-card";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'transform',
    templateUrl: 'component.html',
    imports: [...EUI_ICON, ...EUI_CARD],
    styleUrls: ['../../module.component.scss'],
})
export class TransformComponent {
}
