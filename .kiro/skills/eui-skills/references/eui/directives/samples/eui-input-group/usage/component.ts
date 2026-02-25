import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_LABEL } from '@eui/components/eui-label';
import { DEFAULT_FORMATS, EUI_DATEPICKER } from '@eui/components/eui-datepicker';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EuiGrowlService } from '@eui/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const necessaryValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value ? null : { necessary: true };
};

@Component({
    // tslint:disable-next-line
    selector: 'usage-samples',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiMaxLengthDirective,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_SELECT,
        ...EUI_TEXTAREA,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_DATEPICKER,
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_BADGE,
        ...EUI_ALERT,
        ...EUI_INPUT_NUMBER,
        JsonPipe,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
    ],    

})
export class UsageSamplesComponent implements OnInit {

    public isFormDisabled = false;
    public value = '';

    public isFieldRequired = true;
    public isFieldNecessary = true;

    public formValidation: FormGroup;

    public yearsOptions: any[] = [
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2030', label: '2030' },
    ];

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon', typeClass: 'primary', isOutline: true },
        { id: 2, label: 'Lime', typeClass: 'secondary', isRounded: true },
        { id: 3, label: 'Apple', typeClass: 'info', sizeClass: 'euiSizeS' },
        { id: 4, label: 'Orange', typeClass: 'success', isRemovable: false },
        { id: 5, label: 'Strawberry', typeClass: 'warning' },
        { id: 6, label: 'Peer', typeClass: 'danger', isRemovable: false },
    ];

    public growlService: EuiGrowlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.formValidation = new FormGroup ({
            numberValue1: new FormControl({ value: null, disabled: false }),
            numberValue2: new FormControl({ value: null, disabled: false }),

            // Contains all the necessary fields
            necessaryFormGroup: new FormGroup ({
                numberValuePercent1: new FormControl({ value: null, disabled: false }, { validators: necessaryValidator() }),
                numberValuePercent2: new FormControl({ value: null, disabled: false }, { validators: necessaryValidator() }),
                textareaValue: new FormControl({ value: null, disabled: false }, { validators: necessaryValidator() }),
                autoComplete: new FormControl({ value: null, disabled: false }, { validators: necessaryValidator() }),
                datepicker: new FormControl({ value: null, disabled: false }, { validators: necessaryValidator() }),
            }),

            // Contains all the required fields
            requiredFormGroup: new FormGroup ({
                targetValue1: new FormControl({ value: null, disabled: false }, [Validators.required]),
                targetValue2: new FormControl({ value: null, disabled: false }, [Validators.required]),
                targetYear1: new FormControl({ value: null, disabled: false }, [Validators.required]),
                targetYear2: new FormControl({ value: null, disabled: false }, [Validators.required]),
            }),
        });
    }

    // Form values can be saved if all necessary fields are filled in
    public onSaveForm() {
        this.formValidation.get('necessaryFormGroup').markAllAsTouched(); // This also triggers the renderNecessary() function

        if (this.formValidation.get('necessaryFormGroup').valid) {
            this.growlService.growl({
                severity: 'info',
                summary: 'SAVING...',
                detail: 'The Form values has been successfully saved.',
            });
        } else {
            this.growlService.growl({
                severity: 'warning',
                summary: 'SAVE FAILED!',
                detail: 'Please fill in all the necessary fields in order to be able to Save!',
            });
        }
    }

    // Form can be submitted only if required AND necessary fields values are provided
    public onSubmitForm() {
        this.formValidation.markAllAsTouched();
        if (this.formValidation.valid) {
            this.growlService.growl({
                severity: 'success',
                summary: 'SUBMIT SUCCESS',
                detail: 'The Form has been successfully submitted.',
            });
        } else {
            this.growlService.growl({
                severity: 'danger',
                summary: 'SUBMIT FAILED!',
                detail: 'Please fill in all required fields !',
            });
        }
    }

    public onResetForm() {
        this.formValidation.reset();
    }

    public renderRequired(controlName: string): boolean {
        return this.formValidation?.get('requiredFormGroup').get(controlName).invalid &&
               this.formValidation?.get('requiredFormGroup').get(controlName).touched &&
               this?.formValidation.get('requiredFormGroup').get(controlName).hasError('required');
    }

    public renderNecessary(controlName: string): boolean {
        return this.formValidation?.get('necessaryFormGroup').get(controlName)?.errors?.necessaryValidator &&
               this.formValidation?.get('necessaryFormGroup').get(controlName).touched;
    }

    public onDisableForm() {
        this.isFormDisabled = !this.isFormDisabled;
        this.isFormDisabled ? this.formValidation.disable() : this.formValidation.enable();
    }
}
