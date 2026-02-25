/* eslint-disable max-len */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiMaxLengthDirective } from '@eui/components/directives';
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
        ...EUI_TEXTAREA,
        EuiMaxLengthDirective,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
})
export class ReactiveFormComponent {
    public isEditActive = true;
    public isDisabled = false;

    public isMaxLengthReached = false;
    public maxLength = 1000;
    public smallValue = 'It was a dark and stormy night...';
    public largeValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin mi velit, ac ornare nunc vehicula in. Pellentesque ultrices vitae eros rhoncus feugiat.
Sed in diam vitae felis posuere tempor eu nec augue. Duis nisl orci, finibus at pharetra at, ullamcorper at metus. Fusce ac neque ex. Nunc malesuada magna et arcu porttitor, tincidunt molestie diam posuere.
Praesent sit amet mi posuere, congue sem eget, iaculis leo. Phasellus fermentum tristique quam. Pellentesque eget lorem elit. Sed aliquet orci sed vestibulum volutpat.`;
    public readonly: boolean;
    public model = 'It was a dark and stormy night...';

    public form: FormGroup = new FormGroup({
        control: new FormControl('', [Validators.required]),
        largeControl: new FormControl(this.largeValue, [Validators.required]),
    });

    constructor(public growlService: EuiGrowlService) { }

    public changeState() {
        const value = `It was a dark and stormy night...${Math.floor(Math.random() * 100)}`;
        this.form.get('control').setValue(value);
        this.model = value;
    }

    public onSubmit() {
        this.form.markAllAsTouched();
        this.form.get('control').markAsDirty();
        this.form.get('largeControl').markAsDirty();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public onSubmitModel(form: NgForm) {
        // console.log(form);
        if (form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public changeReadonly() {
        this.readonly = !this.readonly;
    }

    public onMaxLengthReached(event: boolean) {
        this.isMaxLengthReached = event;
    }

    public onToggleDisabled() {
        this.isDisabled = !this.isDisabled;
        this.isDisabled ? this.form.disable() : this.form.enable();
    }

    public onToggleReadonly() {
        this.isEditActive = !this.isEditActive;
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }
}
