import { Component } from "@angular/core";

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EuiArrowKeyNavigableDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'custom-template',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LIST,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_AVATAR,
        EuiArrowKeyNavigableDirective,
    ],
})
export class CustomTemplateComponent {

}
