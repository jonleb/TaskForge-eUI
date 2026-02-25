import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EuiGrowlService } from '@eui/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_RADIO,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
})
export class ReactiveFormComponent {

    public isReadonly = false;
    public isDisabled = false;
    public form: FormGroup = new FormGroup({
        radioForm: new FormControl({ value: null, disabled: this.isDisabled }, [Validators.required]),
    });
    public genders = ['male', 'female', 'other'];

    constructor(public growlService: EuiGrowlService) { }

    public changeState() {
        const radioControl = this.form.get('radioForm');
        const formValue = radioControl.value;
        radioControl.setValue(formValue === 'male' ? 'female' : 'male');
    }

    public onSubmit() {
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public onToggleReadonly() {
        this.isReadonly = !this.isReadonly;
    }

    public onToggleDisabled() {
        this.isDisabled = !this.isDisabled;
        this.isDisabled ? this.form.disable() : this.form.enable();
    }

    public resetForm() {
        this.form.reset();
    }

    public render(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }
}
