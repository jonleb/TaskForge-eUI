import { Component } from '@angular/core';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_RADIO } from '@eui/ecl/components/ecl-radio';

@Component({
    // tslint:disable-next-line
    selector: 'binary',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_ICON, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_RADIO],
})
export class BinaryComponent {}
