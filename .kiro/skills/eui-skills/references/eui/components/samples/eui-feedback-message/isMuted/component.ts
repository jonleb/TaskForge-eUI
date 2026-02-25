import { Component } from '@angular/core';

import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line:component-selector
    selector: 'is-muted',
    templateUrl: 'component.html',
    imports: [
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_ALERT,
    ],
})
export class IsMutedComponent {
}
