---
description: Comprehensive reactive forms integration with FormControl, validation, error handling, and dynamic state management.
id: reactive-forms
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Reactive forms</div>
        <form [formGroup]="form">
            <div euiInputGroup>
                <label euiLabel euiRequired for="select-form">Select month</label>
                <select euiSelect id="select-form" name="month" formControlName="controlValue" placeholder="--select a month--" [readonly]="isReadonly">
                    @for (option of options; let i = $index; track $index) {
                        <option [ngValue]="option.value">{{option.label}}</option>
                    }
                </select>
                @if (hasError('controlValue')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel euiRequired for="select-form-1">With predefined value</label>
                <select euiSelect id="select-form-1" name="month2" formControlName="controlValue2" [readonly]="isReadonly">
                    @for (option of options; let i = $index; track $index) {
                        <option [ngValue]="option.value">{{option.label}}</option>
                    }
                </select>
                @if (hasError('controlValue2')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel euiRequired for="select-form-2">With predefined value and selected through inline template</label>
                <select euiSelect id="select-form-2" name="month3" formControlName="controlValue3" [readonly]="isReadonly">
                    @for (option of options; let i = $index; track $index) {
                        <option [ngValue]="option.value" [attr.disabled]="option?.disabled">{{option.label}}</option>
                    }
                    <option value="jan2023" selected>January 2023</option>
                </select>
                @if (hasError('controlValue3')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel euiRequired for="select-form-multiple">with multiple</label>
                <select euiSelect id="select-form-multiple" name="month" formControlName="controlValue4" multiple [readonly]="isReadonly">
                    @for (option of options; let i = $index; track $index) {
                        <option [ngValue]="option.value">{{option.label}}</option>
                    }
                </select>
                @if (hasError('controlValue4')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>
        </form>
    </div>

    <div class="col-md-5">
        <div class="doc-sample-section-title">Reactive Form content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <div class="eui-u-f-bold eui-u-mr-m">Value</div>
                <pre class="eui-u-text-pre" tabindex="0">{{form.getRawValue() | json}}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Status</div>
                    <eui-badge euiSizeS [euiSuccess]="form.valid" [euiDanger]="!form.valid">
                        {{ form.valid ? 'VALID' : 'INVALID' }}
                    </eui-badge>
                    <eui-badge euiSizeS [euiSuccess]="form.touched" [euiDanger]="!form.touched">
                        {{ form.touched ? 'TOUCHED' : 'UNTOUCHED' }}
                    </eui-badge>
                    @if (form.disabled) {
                        <eui-badge euiSizeS [euiSuccess]="form.disabled">
                            DISABLED
                        </eui-badge>
                    }
                </div>
            </div>
        </div>
        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button euiButton euiPrimary (click)="onSubmit()" class="eui-u-mr-m eui-u-mb-m">Submit form</button>
            <button euiButton euiOutline euiPrimary (click)="onResetForm()" class="eui-u-mr-m eui-u-mb-m">Reset</button>
            <button euiButton euiPrimary euiOutline (click)="onToggleReadonly()" class="eui-u-mr-m eui-u-mb-m">Toggle Readonly</button>
            <button euiButton euiPrimary euiOutline (click)="onToggleDisabled()" class="eui-u-mr-m eui-u-mb-m">Toggle Disabled</button>
            <button euiButton euiPrimary euiOutline (click)="changeValue()" class="eui-u-mr-m eui-u-mb-m">Change value</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiGrowlService } from '@eui/core';


@Component({
    // tslint:disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_SELECT,
        JsonPipe,
    ],
    providers: [EuiGrowlService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent implements OnInit {

    public isReadonly = false;
    public isDisabled = false;
    public form: FormGroup;
    public options: {value: string; label: string; selected?: boolean; disabled?: boolean}[] = [
        { value: 'jan2021', label: 'January 2021' },
        { value: 'feb2021', label: 'February 2021' },
        { value: 'mar2021', label: 'March 2021' },
        { value: 'apr2021', label: 'April 2021' },
        { value: 'may2021', label: 'May 2021' },
        { value: 'jun2021', label: 'June 2021' },
        { value: 'jul2021', label: 'July 2021' },
        { value: 'aug2021', label: 'August 2021' },
        { value: 'sep2021', label: 'September 2021' },
        { value: 'oct2021', label: 'October 2021', disabled: true },
        { value: 'nov2021', label: 'November 2021', disabled: true },
        { value: 'dec2021', label: 'December 2021' },
        { value: 'jan2022', label: 'January 2022' },
        { value: 'feb2022', label: 'February 2022' },
        { value: 'mar2022', label: 'March 2022' },
        { value: 'apr2022', label: 'April 2022' },
        { value: 'may2022', label: 'May 2022' },
        { value: 'jun2022', label: 'June 2022' },
        { value: 'jul2022', label: 'July 2022' },
        { value: 'aug2022', label: 'August 2022' },
        { value: 'sep2022', label: 'September 2022' },
        { value: 'oct2022', label: 'October 2022' },
        { value: 'nov2022', label: 'November 2022' },
        { value: 'dec2022', label: 'December 2022' },
    ];

    public growlService = inject(EuiGrowlService);
    private fb = inject(FormBuilder);

    ngOnInit(): void {
        this.form = this.fb.group({
            controlValue: new FormControl({ value: '', disabled: this.isDisabled }, [Validators.required]),
            controlValue2: new FormControl({ value: 'nov2021', disabled: this.isDisabled }, [Validators.required]),
            controlValue3: new FormControl({ value: 'jul2022', disabled: this.isDisabled }, [Validators.required]),
            controlValue4: new FormControl({ value: ['jan2021', 'feb2021'], disabled: this.isDisabled }, [Validators.required]),
        });
    }

    public changeValue() {
        const value = this.options[Math.floor(Math.random() * this.options.length)].value;
        this.form.get('controlValue').setValue(value);
    }

    public onSubmit() {
        this.form.markAllAsTouched();
        this.form.get('controlValue').markAsDirty();
        this.form.get('controlValue2').markAsDirty();
        this.form.get('controlValue3').markAsDirty();
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

    public onResetForm(): void {
        this.form.reset();
    }

    hasError(controlName: string): boolean {
        const control = this.form.controls[controlName];
        return control.touched && control.errors != null;
    }
}
```

