import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { EuiGrowlService } from '@eui/core';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { requireCheckboxesToBeCheckedValidator } from './requiredMultipleCheckboxValidator';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        JsonPipe,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
    ],
})
export class ReactiveFormComponent implements OnInit, OnDestroy {

    public isReadonly = false;
    public isDisabled = false;
    public form: FormGroup;
    public myCheckboxGroup: FormGroup;
    public myBooleanCheckboxGroup: FormGroup;

    public checkboxOptions: Array<any> = [
        { id: 1, value: 'en', label: 'English', controlName: 'myCheckbox1', controlValue: false },
        { id: 2, value: 'fr', label: 'french', controlName: 'myCheckbox2', controlValue: false },
        { id: 3, value: 'de', label: 'deutsch', controlName: 'myCheckbox3', controlValue: false },
        { id: 4, value: 'es', label: 'spanish', controlName: 'myCheckbox4', controlValue: false },
        { id: 5, value: 'el', label: 'greek', controlName: 'myCheckbox5', controlValue: false },
    ];

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder, public growlService: EuiGrowlService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            myCheckboxGroup: this.myCheckboxGroup = new FormGroup({
                myCheckbox1: new FormControl({ value: false, disabled: this.isDisabled }),
                myCheckbox2: new FormControl({ value: false, disabled: this.isDisabled }),
                myCheckbox3: new FormControl({ value: false, disabled: this.isDisabled }),
                myCheckbox4: new FormControl({ value: false, disabled: this.isDisabled }),
                myCheckbox5: new FormControl({ value: false, disabled: this.isDisabled }),
            }, requireCheckboxesToBeCheckedValidator() ),
            mySingleCheckbox: [{ value: false, disabled: this.isDisabled }, [Validators.requiredTrue]],
            myBooleanCheckboxGroup: this.myBooleanCheckboxGroup = new FormGroup({
                myBooleanCheckboxY: new FormControl({ value: false, disabled: this.isDisabled }),
                myBooleanCheckboxN: new FormControl({ value: false, disabled: this.isDisabled }),
            }),
        });

        // Changing values from multi-select checkboxes (radio behaviour)
        this.form.get('myBooleanCheckboxGroup.myBooleanCheckboxY').valueChanges
            .pipe( takeUntil(this.destroy$))
            .subscribe(() => {
                if ( this.form.get('myBooleanCheckboxGroup.myBooleanCheckboxY').value ) {
                    this.form.get('myBooleanCheckboxGroup.myBooleanCheckboxN')
                        .patchValue(false, { emitEvent: false }) ;
                }
            });

            this.form.get('myBooleanCheckboxGroup.myBooleanCheckboxN').valueChanges
            .pipe( takeUntil(this.destroy$))
            .subscribe(() => {
                if ( this.form.get('myBooleanCheckboxGroup.myBooleanCheckboxN').value ) {
                    this.form.get('myBooleanCheckboxGroup.myBooleanCheckboxY')
                        .patchValue(false, { emitEvent: false }) ;
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public changeReactiveValues() {
        this.form.get('myCheckboxGroup.myCheckbox1').setValue(!this.form.get('myCheckboxGroup.myCheckbox1').value);
        this.form.get('myCheckboxGroup.myCheckbox2').setValue(!this.form.get('myCheckboxGroup.myCheckbox2').value);
        this.form.get('myCheckboxGroup.myCheckbox3').setValue(!this.form.get('myCheckboxGroup.myCheckbox3').value);
        this.form.get('myCheckboxGroup.myCheckbox4').setValue(!this.form.get('myCheckboxGroup.myCheckbox4').value);
        this.form.get('myCheckboxGroup.myCheckbox5').setValue(!this.form.get('myCheckboxGroup.myCheckbox5').value);
    }

    public submit() {
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

    public onToggleDisabled(): void {
        this.isDisabled = !this.isDisabled;
        if (this.isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    public render(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }
}
