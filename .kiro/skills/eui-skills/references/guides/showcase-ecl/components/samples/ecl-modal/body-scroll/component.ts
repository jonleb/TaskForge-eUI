import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_CHECKBOX } from '@eui/ecl/components/ecl-checkbox';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EclModalCloseEvent, EclModalOpenEvent, EUI_ECL_MODAL } from '@eui/ecl/components/ecl-modal';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'body-scroll',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_ECL_BUTTON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_CHECKBOX,
        ...EUI_ECL_MODAL, ...EUI_ECL_SELECT],
})
export class BodyScrollComponent {

    size: 's' | 'l' = 'l';

    onOpen(evt: EclModalOpenEvent) {
        console.log(evt);
    }

    onClose(evt: EclModalCloseEvent<string>) {
        console.log(evt);
    }
}
