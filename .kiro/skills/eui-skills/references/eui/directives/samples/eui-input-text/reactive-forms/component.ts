import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';

@Component({
    // tslint:disable:max-line-length
    // tslint:disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        EuiMaxLengthDirective,
        ...EUI_ICON,
        JsonPipe,
    ],
    providers: [
        EuiGrowlService,
    ],
})
export class ReactiveFormComponent {

    public isReadonly = false;
    public isDisabled = false;
    public isMaxLengthReached = false;
    public model1 = 'Input text sample';
    public model2 = 'Input text sample with addon';
    public largeValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin mi velit, ac ' +
        'ornare nunc vehicula in. Pellentesque ultrices vitae eros rhoncus feugiat.';

    public form: FormGroup = new FormGroup({
        control: new FormControl({ value: null, disabled: this.isDisabled }, [Validators.required]),
        storyControl: new FormControl({ value: this.largeValue, disabled: this.isDisabled }, [Validators.required]),
    });

    constructor(public growlService: EuiGrowlService) { }

    public onChangeValue() {
        const value = `Input text sample ${Math.floor(Math.random() * 100)}`;
        this.form.get('control').setValue(value);
        this.model1 = value;
        this.model2 = value;
    }

    public onSubmit() {
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public onMaxLengthReached(event: boolean) {
        this.isMaxLengthReached = event;
    }

    public render(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
        this.isDisabled ? this.form.disable() : this.form.enable();
    }
}
