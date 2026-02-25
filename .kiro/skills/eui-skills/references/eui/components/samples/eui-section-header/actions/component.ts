import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    // eslint-disable-next-line
    selector: 'actions',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
    ],
})
export class ActionsComponent {
}
