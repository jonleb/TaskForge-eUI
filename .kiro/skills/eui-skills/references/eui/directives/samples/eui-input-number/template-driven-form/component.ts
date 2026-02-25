import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';

@Component({
    // tslint:disable-next-line
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_NUMBER,
        JsonPipe,
    ],
})
export class TemplateDrivenFormsComponent {
    public myVal = 9999.111;
    public myVal2 = 100000;
    public readonly = false;
    public disableAmount1 = false;
    public disableAmount2 = false;

    constructor(public growlService: EuiGrowlService) {
    }

    public onSubmitModel(form: NgForm) {
        console.log(form);
        if (form.status !== 'VALID') {
            this.growlService.growl({severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !'});
        } else {
            this.growlService.growl({severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.'});
        }
    }

}
