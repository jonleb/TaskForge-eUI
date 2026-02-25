import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Vertical',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_ICON,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        EuiTooltipDirective,
    ],
})
export class VerticalComponent {
    form: FormGroup = new FormGroup({
        inputVertical: new FormControl({ value: 'Lorem ipsum', disabled: false }, [Validators.required]),
    });
}
