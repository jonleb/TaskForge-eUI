import { Component } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
    ],
})
export class ColorsComponent {
}
