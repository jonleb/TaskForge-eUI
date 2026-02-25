import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_DATE_RANGE_SELECTOR, EuiDateRangeSelectorDates } from '@eui/components/eui-date-range-selector';
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
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
    // tslint:disable-next-line
    selector: 'form-theming',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_SELECT,
        ...EUI_TEXTAREA,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_INPUT_RADIO,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_DATEPICKER,
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_BADGE,
        ...EUI_ALERT,
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_FIELDSET,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
    ],    

})
export class ThemingComponent implements OnInit {
    public isEditActive = true;
    public isCompact = false;
    public isVerticalLayout = true;
    public isFormDisabled = false;
    public value = '';

    public today = new Date('06/08/1987');
    public tenDaysLater = this.today.setDate(this.today.getDate() + 10);
    public newDate = new Date(this.tenDaysLater);

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

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon', typeClass: 'primary', isOutline: true },
        { id: 2, label: 'Lime', typeClass: 'secondary', isRounded: true },
        { id: 3, label: 'Apple', typeClass: 'info', sizeClass: 'euiSizeS' },
        { id: 4, label: 'Orange', typeClass: 'success', isRemovable: false },
        { id: 5, label: 'Strawberry', typeClass: 'warning' },
        { id: 6, label: 'Peer', typeClass: 'danger', isRemovable: false },
    ];
    public growlService: EuiGrowlService = inject(EuiGrowlService);
    private fb: FormBuilder = inject(FormBuilder);

    constructor( public asService: EuiAppShellService ) {}

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
            daterangeselector: new FormControl<EuiDateRangeSelectorDates>({
                    startRange: new Date('06/08/1987'),
                    endRange: this.newDate },
                    [Validators.required]),
            mySingleCheckbox: [{ value: false, disabled: false }, [Validators.requiredTrue]],
            radioValue: [{ value: '', disabled: false }, [Validators.required]],
        });
    }

    public onSubmitForm() {
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

    public onSetCompact() {
        this.asService.setBaseFontSize('14px');
    }

    public onToggleVerticalLayout() {
        this.isVerticalLayout = !this.isVerticalLayout;
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    public onDisableForm() {
        this.isFormDisabled = !this.isFormDisabled;
        this.isFormDisabled ? this.formValidation.disable() : this.formValidation.enable();
    }
}
