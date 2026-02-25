import { Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_ICON, ...EUI_LABEL],
})
export class ColorsComponent {
}
