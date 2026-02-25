import { Component } from '@angular/core';
import { EUI_ECL_CHECKBOX } from '@eui/ecl/components/ecl-checkbox';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';

@Component({
    // tslint:disable-next-line
    selector: 'standalone',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_CHECKBOX],
})
export class StandaloneComponent {}
