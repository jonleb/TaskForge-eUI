import { Component } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_TEXT_INPUT } from '@eui/ecl/components/ecl-text-input';

@Component({
    // tslint:disable-next-line
    selector: 'misc',
    templateUrl: 'component.html',
    imports: [NgxMaskDirective, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_TEXT_INPUT],
    providers: [
        provideNgxMask()
    ],
})
export class MiscellaneousComponent {}
