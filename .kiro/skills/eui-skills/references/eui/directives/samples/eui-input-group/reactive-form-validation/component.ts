import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    Validators,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { DEFAULT_FORMATS, EUI_DATEPICKER } from '@eui/components/eui-datepicker';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_DATE_RANGE_SELECTOR } from '@eui/components/eui-date-range-selector';
import { EuiGrowlService } from '@eui/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { EUI_HELPER_TEXT } from '@eui/components/eui-helper-text';

/**
 * A Group Control Validator that checks if a threshold of checked control checkboxes is reached and
 * returns an error otherwise clear existing control errors.
 *
 * @param minRequired
 */
export const requireCheckboxesToBeCheckedValidator = (minRequired = 1): ValidatorFn => (formGroup: FormGroup): ValidationErrors | null => {
    // indicate how many checkboxes are checked
    let checked = 0;
    // find how many checkboxes are checked
    Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control.value === true) {
            checked++;
        }
    });
    // if number of checked checkboxes is less than required, return error
    if (checked < minRequired) {
        // invalid all children
        Object.keys(formGroup.controls).forEach(key => {
            formGroup.controls[key].setErrors({ incorrect: true }, { emitEvent: true });
        });
        return { requireCheckboxesToBeChecked: true };
    } else {
        Object.keys(formGroup.controls).forEach(key => {
            // Clear the errors
            formGroup.controls[key].setErrors(null, { emitEvent: true });
        });
    }
    return null;
};

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactive-form-validation',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_BADGE,
        ...EUI_CARD,
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_RADIO,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_DATEPICKER,
        ...EUI_INPUT_NUMBER,
        ...EUI_AUTOCOMPLETE,
        ...EUI_SELECT,
        ...EUI_TEXTAREA,
        ...EUI_HELPER_TEXT,
        EuiMaxLengthDirective,
        EuiTooltipDirective,
        JsonPipe,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
    ],    
})
export class ReactiveFormValidationComponent implements OnInit {
    public isEditActive = true;
    public isCompact = false;
    public isVerticalLayout = true;
    public isFormDisabled = false;
    public value = '';

    public formValidation: FormGroup;
    public selectOptions: any[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    public radioOptions: any[] = [
        { value: '1', label: 'Choice 1' },
        { value: '2', label: 'Choice 2' },
        { value: '3', label: 'Choice 3' },
        { value: '4', label: 'Choice 4' },
    ];

    public myCheckboxGroup: FormGroup;
    public checkboxOptions: Array<any> = [
        { id: 1, value: 'en', label: 'English', controlName: 'myCheckbox1', controlValue: false },
        { id: 2, value: 'fr', label: 'french', controlName: 'myCheckbox2', controlValue: false },
        { id: 3, value: 'de', label: 'deutsch', controlName: 'myCheckbox3', controlValue: false },
        { id: 4, value: 'es', label: 'spanish', controlName: 'myCheckbox4', controlValue: false },
        { id: 5, value: 'el', label: 'greek', controlName: 'myCheckbox5', controlValue: false },
    ];

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon', typeClass: 'primary', isOutline: true },
        { id: 2, label: 'Lime', typeClass: 'secondary', isRounded: true },
        { id: 3, label: 'Apple', typeClass: 'info', sizeClass: 'euiSizeS' },
        { id: 4, label: 'Orange', typeClass: 'success', isRemovable: false },
        { id: 5, label: 'Strawberry', typeClass: 'warning' },
        { id: 6, label: 'Peer', typeClass: 'danger', isRemovable: false },
    ];
    private fb: FormBuilder = inject(FormBuilder);
    public growlService: EuiGrowlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.formValidation = this.fb.group({
            inputValue: [{ value: null, disabled: false }, [Validators.required]],
            inputValue2: [{ value: null, disabled: false }, [Validators.required]],
            inputValue3: [{ value: null, disabled: false }, [Validators.required]],
            numberValue: [{ value: null, disabled: false }, [Validators.required]],
            textareaValue: [{ value: null, disabled: false }, [Validators.required]],
            selectValue: [{ value: null, disabled: false }, [Validators.required]],
            autoComplete: [{ value: null, disabled: false }, [Validators.required]],
            datepicker: [{ value: null, disabled: false }, [Validators.required]],
            daterangeselector: [{
                    value: null,
                    disabled: false },
                    [Validators.required]],
            mySingleCheckbox: [{ value: false, disabled: false }, [Validators.requiredTrue]],
            myCheckboxGroup: this.myCheckboxGroup = new FormGroup({
                myCheckbox1: new FormControl({ value: false, disabled: false }),
                myCheckbox2: new FormControl({ value: false, disabled: false }),
                myCheckbox3: new FormControl({ value: false, disabled: false }),
                myCheckbox4: new FormControl({ value: false, disabled: false }),
                myCheckbox5: new FormControl({ value: false, disabled: false }),
            }, requireCheckboxesToBeCheckedValidator() ),
            radioValue: new FormControl({ value: null, disabled: false }, [Validators.required]),
            mailBoxValue: new FormControl({ value: null, disabled: false }, Validators.compose( [Validators.email, Validators.required])),
        });
    }

    public onSubmitForm() {
        // markFormGroupTouched(this.formValidation.controls);
        this.formValidation.markAllAsTouched();
        if (this.formValidation.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public onResetForm() {
        this.formValidation.reset();
    }

    public onToggleEdit() {
        this.isEditActive = !this.isEditActive;
    }

    public onToggleCompact() {
        this.isCompact = !this.isCompact;
    }

    public onToggleVerticalLayout() {
        this.isVerticalLayout = !this.isVerticalLayout;
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    public checkEmail(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('email');
    }

    public onDisableForm() {
        this.isFormDisabled = !this.isFormDisabled;
        this.isFormDisabled ? this.formValidation.disable() : this.formValidation.enable();
    }
}
