import { Component} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiGrowlService } from '@eui/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'template-driven-form',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
})
export class TemplateDrivenFormComponent {

    public isReadonly = false;
    public modelCheckedValueEN = false;
    public modelCheckedValueFR = false;
    public modelCheckedValueES = false;
    public modelValue;

    constructor(public growlService: EuiGrowlService) { }

    public changeModelValues() {
        this.modelValue = !this.modelValue;
        this.modelCheckedValueEN = !this.modelCheckedValueEN;
        this.modelCheckedValueFR = !this.modelCheckedValueFR;
        this.modelCheckedValueES = !this.modelCheckedValueES;
    }

    public onSubmitModel(form: NgForm) {
        this.growlService.growl({ severity: 'info', summary: 'SUBMIT', detail: 'The Form has been successfully submitted !' });
    }

}
