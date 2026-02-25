import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_LIST } from '@eui/ecl/components/ecl-list';
import { EclModalCloseEvent, EclModalOpenEvent, EUI_ECL_MODAL } from '@eui/ecl/components/ecl-modal';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';
import { EUI_ECL_TEXT_INPUT } from '@eui/ecl/components/ecl-text-input';

@Component({
    // tslint:disable-next-line
    selector: 'StaticTemplate',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_ECL_BUTTON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_FEEDBACK_MESSAGE,
        ...EUI_ECL_MODAL, ...EUI_ECL_SELECT, ...EUI_ECL_LIST, ...EUI_ECL_TEXT_INPUT, ...EUI_ECL_ICON],
})
export class StaticTemplateComponent {
    variant = '';

    firstName: string;
    result: string;

    onOpen(evt: EclModalOpenEvent) {
        console.log(evt);
    }

    onClose(evt: EclModalCloseEvent<string>) {
        console.log(evt);
    }

    onCloseWithData(evt: EclModalCloseEvent<string>) {
        if(evt.eclModalResult.eclModalRole === 'confirm') {
            this.result = evt.eclModalResult.eclModalData;
        }
        console.log(evt);
    }

    onCloseWithPreventDefault(evt: EclModalCloseEvent<string>) {
        if(evt.eclModalResult.eclModalRole === 'confirm') {
            evt.preventDefault();
        }
        console.log(evt);
    }
}
