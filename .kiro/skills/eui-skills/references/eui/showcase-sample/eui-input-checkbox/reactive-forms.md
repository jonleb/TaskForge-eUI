---
description: Shows checkbox integration with Angular reactive forms using formControlName, including checkbox groups with custom validation (requireCheckboxesToBeChecked), single mandatory checkboxes, boolean checkboxes, and readonly state handling.
id: reactive-forms
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Reactive forms</div>
        <form [formGroup]="form">
            <div euiInputGroup formGroupName="myCheckboxGroup">
                <label euiLabel euiRequired>Choose preferred language(s)</label>
                @for (checkbox of checkboxOptions; let i = $index; track $index) {
                    <div class="eui-u-inline-flex eui-u-mb-s">
                        <input euiInputCheckBox name="checkbox" id="reactive-checkid-{{i}}" formControlName="{{checkbox.controlName}}" [readonly]="isReadonly"/>
                        <label for="reactive-checkid-{{i}}">{{checkbox.label}}</label>
                    </div>
                }
                @if (!isReadonly && myCheckboxGroup?.errors?.requireCheckboxesToBeChecked && myCheckboxGroup.touched) {
                    <eui-feedback-message euiDanger>At least one checkbox is required to be checked</eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel euiRequired>Single mandatory checkbox</label>

                <div class="eui-u-inline-flex">
                    <input euiInputCheckBox id="reactive-checkbox-agree" formControlName="mySingleCheckbox" [readonly]="isReadonly"/>
                    <label for="reactive-checkbox-agree">I agree</label>
                </div>
                @if (!isReadonly && render('mySingleCheckbox')) {
                    <eui-feedback-message euiDanger>This checkbox is mandatory and must be checked</eui-feedback-message>
                }
            </div>

            <div euiInputGroup formGroupName="myBooleanCheckboxGroup">
                <label euiLabel>Custom checkboxes acting like radios</label>
                <div class="eui-u-flex eui-u-flex-wrap">
                    <input euiInputCheckBox id="reactive-checkbox-boolean-y" formControlName="myBooleanCheckboxY" [readonly]="isReadonly"/>
                    <label for="reactive-checkbox-boolean-y">Yes</label>

                    <input euiInputCheckBox id="reactive-checkbox-boolean-n" formControlName="myBooleanCheckboxN" [readonly]="isReadonly"/>
                    <label for="reactive-checkbox-boolean-n">No</label>
                </div>
            </div>
        </form>
    </div>

    <div class="col-md-5">
        <div class="doc-sample-section-title">Reactive Form content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ form.getRawValue() | json}}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="form.status === 'VALID'" [euiDanger]="form.status !== 'VALID'">
                        {{ form.status }}
                    </eui-badge>
                </div>
            </div>
        </div>

        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button euiButton euiPrimary (click)="submit()" class="eui-u-mr-m eui-u-mb-m">Submit form</button>
            <button euiButton euiPrimary euiOutline (click)="onToggleReadonly()" class="eui-u-mr-m eui-u-mb-m">Toggle Readonly</button>
            <button euiButton euiPrimary euiOutline (click)="onToggleDisabled()" class="eui-u-mr-m eui-u-mb-m">Toggle Disabled</button>
            <button euiButton euiPrimary euiOutline (click)="changeReactiveValues()" class="eui-u-mr-m eui-u-mb-m">Change value</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush
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

    private fb = inject(FormBuilder);
    private growlService = inject(EuiGrowlService);

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
```

```typescript
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

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
        // Clear the errors
        // Object.keys(formGroup.controls).forEach(key => {
        //     const control = formGroup.controls[key];
        //     // filter out the requireCheckboxesToBeChecked error
        //     const { requireCheckboxesToBeChecked: _, ...errors } = control.errors || {};
        //     control.setErrors(Object.keys(errors).length > 0 ? errors: null, { emitEvent: true });
        // });
        Object.keys(formGroup.controls).forEach(key => {
            // Clear the errors
            formGroup.controls[key].setErrors(null, { emitEvent: true });
        });
    }
    return null;
};
```

