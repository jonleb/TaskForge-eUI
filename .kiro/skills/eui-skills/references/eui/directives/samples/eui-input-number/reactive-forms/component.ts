import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';

@Component({
    // tslint:disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_ICON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_NUMBER,
        JsonPipe,
    ],
})
export class ReactiveFormComponent {
    public readonly = false;
    public disableAmount1 = false;
    public disableAmount2 = false;
    public formGroup: FormGroup = new FormGroup({
        amount1: new FormControl({value: 999999.02, disabled: this.disableAmount1}, [Validators.required]),
        amount2: new FormControl({value: 100000, disabled: this.disableAmount2}),
    });

    constructor(public growlService: EuiGrowlService) {
    }

    public onToggleReadonly() {
        this.readonly = !this.readonly;
    }

    public onToggleDisabled() {
        this.disableAmount1 = !this.disableAmount1;
        this.disableAmount2 = !this.disableAmount2;
        this.disableAmount1 ? this.formGroup.get('amount1').disable() : this.formGroup.get('amount1').enable();
        this.disableAmount2 ? this.formGroup.get('amount2').disable() : this.formGroup.get('amount2').enable();
    }

    public onPatchValue() {
        this.formGroup.patchValue({amount1: 123456789.02});
    }

    public onSubmit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.status !== 'VALID') {
            this.growlService.growl({severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !'});
        } else {
            this.growlService.growl({severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.'});
        }
    }

    public render(controlName: string): boolean {
        return !this.readonly && this.formGroup?.get(controlName).invalid &&
            this.formGroup?.get(controlName).touched &&
            this?.formGroup.get(controlName).hasError('required');
    }
}
