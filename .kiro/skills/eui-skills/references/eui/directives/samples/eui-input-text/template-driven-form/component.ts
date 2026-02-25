import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';

@Component({
    // tslint:disable:max-line-length
    // tslint:disable-next-line
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        FormsModule,
        ReactiveFormsModule,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_ICON,
        JsonPipe,
    ],
    providers: [
        EuiGrowlService,
    ],
})
export class TemplateDrivenFormsComponent {
    public isReadonly = false;
    public isDisabled = false;
    public model1 = 'Input text sample';
    public model2 = 'Input text sample with addon';

    constructor(public growlService: EuiGrowlService) { }

    public onSubmitModel(form: NgForm) {
        console.log(form);
        if (form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

}
