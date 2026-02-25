---
description: Provides various practical usage examples of euiInputGroup in different contexts and compositions.
id: usage
---

```html
<p class="eui-u-text-paragraph">The following sample is using a reactive form with responsive layout display featuring enhanced visuals (strict usage only) to respond to
    some custom business rules which are affecting the form input states and their validation(s).</p>

<br>

<eui-alert euiWarning>
    <eui-alert-title>Important usage notice</eui-alert-title>
    This sample is using different background colors for the input fields (default: white) which are passing the WCAG2 AA accessibility tests.
    It should be used wisely and in <strong>restricted usage only</strong> without diverging from original provided colors for the utility class names, at the risk of no longer being accessible.
</eui-alert>

<br>

<eui-card euiCollapsible>
    <eui-card-header>
        <eui-card-header-title>Research, Innovation and Competitiveness</eui-card-header-title>
        <eui-card-header-subtitle>Progress towards national spending objectives</eui-card-header-subtitle>
        <eui-card-header-right-content>
            <!-- Custom actions here -->
        </eui-card-header-right-content>
    </eui-card-header>

    <eui-card-content>
        <form [formGroup]="formValidation">
            <div class="row">

                <!-- HEADER -->
                <div class="row eui-u-f-bold eui-u-mb-m">
                    <div class="col-md-4">
                        Public RIC expenditure
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-3">2020</div>
                            <div class="col-md-3">2021</div>
                            <div class="col-md-3">Target value</div>
                            <div class="col-md-3">Target year</div>
                        </div>
                    </div>
                </div>

                <!-- ROW 1 -->
                <div class="row eui-u-mb-s">
                    <div class="col-md-4">
                        Total Yearly R&I public expenditure in clean energy and low-carbon technologies
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-3">
                                <div euiInputGroup>
                                    <div euiInputGroupAddOn>
                                        <input euiInputNumber formControlName="numberValue1" placeholder="Value" aria-label="Enter a number"/>
                                        <div euiInputGroupAddOnItem>M&euro;</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div euiInputGroup formGroupName="necessaryFormGroup">
                                    <div euiInputGroupAddOn>
                                        <input euiInputNumber formControlName="numberValuePercent1" placeholder="Value" max=100 min=0 [class.eui-u-c-bg-warning-surface-light]="isFieldNecessary" aria-label="Enter a percentage"/>
                                        <div euiInputGroupAddOnItem>%</div>
                                    </div>
                                    @if (renderNecessary('numberValuePercent1')) {
                                        <eui-feedback-message euiWarning>This field is necessary</eui-feedback-message>
                                    }
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div euiInputGroup formGroupName="requiredFormGroup">
                                    <div euiInputGroupAddOn>
                                        <input euiInputNumber formControlName="targetValue1" placeholder="Value" [class.eui-u-c-bg-danger-surface-light]="isFieldRequired" aria-label="Enter a number"/>
                                        <div euiInputGroupAddOnItem>M&euro;</div>
                                    </div>
                                    @if (renderRequired('targetValue1')) {
                                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                                    }
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div euiInputGroup formGroupName="requiredFormGroup">
                                    <select euiSelect name="target-year1" id="target-year1" placeholder="Year" formControlName="targetYear1" [class.eui-u-c-bg-danger-surface-light]="isFieldRequired">
                                        @for (option of yearsOptions; track $index) {
                                            <option [ngValue]="option.value">{{option.label}}</option>
                                        }
                                    </select>
                                    @if (renderRequired('targetYear1')) {
                                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ROW 2 -->
                <div class="row eui-u-mb-s">
                    <div class="col-md-4">
                        Total Yearly R&I public expenditure in clean energy and low-carbon technologies, as a percentage share of overall public R&I expenditure
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-3">
                                <div euiInputGroup>
                                    <div euiInputGroupAddOn>
                                        <input euiInputNumber formControlName="numberValue2" placeholder="Value" aria-label="Enter a number" />
                                        <div euiInputGroupAddOnItem>M&euro;</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div euiInputGroup formGroupName="necessaryFormGroup">
                                    <div euiInputGroupAddOn>
                                        <input euiInputNumber formControlName="numberValuePercent2" placeholder="Value" max=100 min=0 [class.eui-u-c-bg-warning-surface-light]="isFieldNecessary" aria-label="Enter a percentage" />
                                    </div>
                                    @if (renderNecessary('numberValuePercent2')) {
                                        <eui-feedback-message euiWarning>This field is necessary</eui-feedback-message>
                                    }
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div euiInputGroup formGroupName="requiredFormGroup">
                                    <div euiInputGroupAddOn>
                                        <input euiInputNumber formControlName="targetValue2" placeholder="Value" [class.eui-u-c-bg-danger-surface-light]="isFieldRequired" aria-label="Enter a number"/>
                                        <div euiInputGroupAddOnItem>M&euro;</div>
                                    </div>
                                    @if (renderRequired('targetValue2')) {
                                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                                    }
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div euiInputGroup formGroupName="requiredFormGroup">
                                    <select euiSelect name="target-year2" id="target-year2" placeholder="Year" formControlName="targetYear2" [class.eui-u-c-bg-danger-surface-light]="isFieldRequired">
                                        @for (option of yearsOptions; track $index) {
                                            <option [ngValue]="option.value">{{option.label}}</option>
                                        }
                                    </select>
                                    @if (renderRequired('targetYear2')) {
                                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div euiInputGroup formGroupName="necessaryFormGroup">
                <label euiLabel>Textarea</label>
                <div euiInputGroupAddOn>
                    <div euiInputGroupAddOnItem>EN</div>
                    <textarea euiTextArea formControlName="textareaValue" [euiMaxlength]="100" placeholder="Type some text" [class.eui-u-c-bg-warning-surface-light]="isFieldNecessary"></textarea>
                    @if (renderNecessary('textareaValue')) {
                        <eui-feedback-message euiWarning>This field is necessary</eui-feedback-message>
                    }
                </div>
            </div>

            <div euiInputGroup formGroupName="necessaryFormGroup">
                <label euiLabel>Autocomplete</label>
                <eui-autocomplete formControlName="autoComplete"
                                [autocompleteData]="autocompleteDataFormAutocomplete"
                                [isFreeValueAllowed]="true"
                                placeholder="Select a fruit"
                                [euiWarning] = "isFieldNecessary" />
                @if (renderNecessary('autoComplete')) {
                    <eui-feedback-message euiWarning>This field is necessary</eui-feedback-message>
                }
            </div>

            <div euiInputGroup formGroupName="necessaryFormGroup">
                <label euiLabel>Datepicker</label>
                <eui-datepicker formControlName="datepicker" [euiWarning]="isFieldNecessary" />
                @if (renderNecessary('datepicker')) {
                    <eui-feedback-message euiWarning>This field is necessary</eui-feedback-message>
                }
            </div>
        </form>
    </eui-card-content>

    <eui-card-footer>
        <eui-card-footer-action-buttons>
            <div class="eui-u-flex eui-u-flex-justify-content-start">
                <button euiButton euiSecondary (click)="onResetForm()">Reset</button>
                <button euiButton euiSecondary (click)="onDisableForm()">{{isFormDisabled ? 'Enable' : 'Disable'}}</button>
            </div>
            
            <div class="eui-u-flex eui-u-flex-justify-content-center eui-u-flex-wrap eui-u-flex-gap-m">
                <div class="eui-u-display-flex eui-u-flex-gap-s">
                    <eui-icon-svg icon="eui-square-o" size="s" fillColor="secondary" />
                    <em>Optional</em>
                </div>
                <div class="eui-u-display-flex eui-u-flex-gap-s">
                    <eui-icon-svg icon="eui-square" size="s" fillColor="warning-surface-light" />
                    <em>Necessary</em>
                </div>
                <div class="eui-u-display-flex eui-u-flex-gap-s">
                    <eui-icon-svg icon="eui-square" size="s" fillColor="danger-surface-light" />
                    <em>Required</em>
                </div>
            </div>

            <div class="eui-u-flex eui-u-flex-justify-content-end">
                <button euiButton euiPrimary euiOutline (click)="onSaveForm()">Save</button>
                <button euiButton euiPrimary (click)="onSubmitForm()" [euiDisabled]="formValidation.status !== 'VALID'">Submit</button>
            </div>
        </eui-card-footer-action-buttons>
    </eui-card-footer>
</eui-card>

<div class="row eui-u-mt-m">
    <div class="col-md-12">
        <div class="eui-u-f-bold">Reactive Form content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ formValidation.value | json }}</pre>
            </div>
        </div>

        <div class="eui-u-f-bold eui-u-mt-l eui-u-mb-m">Form status</div>
        <eui-badge [euiSuccess]="formValidation.status === 'VALID'" [euiDanger]="formValidation.status !== 'VALID'">
            {{ formValidation.status }}
        </eui-badge>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    changeDetection: ChangeDetectionStrategy.OnPush
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
```

