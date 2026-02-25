---
description: Template-driven forms implementation using ngModel for two-way data binding with validation and form submission.
id: template-driven-form
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Two-way data binding (ngModel)</div>
        <form #myForm="ngForm" id="my-form" novalidate (ngSubmit)="onSubmitModel(myForm)">

            <div euiInputGroup>
                <label euiLabel euiRequired for="template_drive">Template</label>
                <select euiSelect name="framework"
                        placeholder="Select a framework"
                        id="template_drive"
                        [(ngModel)]="model"
                        #template="ngModel"
                        required
                        [readonly]="isReadonly"
                        [disabled]="isDisabled"
                        aria-label="with two-way data binding">
                    @for (option of options; let i = $index; track $index) {
                        <option [ngValue]="option.value">{{option.label}}</option>
                    }
                </select>
                @if (myForm.status !== 'VALID') {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>
        </form>
    </div>

    <div class="col-md-5">
        <div class="doc-sample-section-title">NgModel content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ {'Value': myForm.value} | json}}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Status</div>
                    <eui-badge euiSizeS [euiSuccess]="myForm.valid" [euiDanger]="!myForm.valid">
                        {{ myForm.valid ? 'VALID' : 'INVALID' }}
                    </eui-badge>
                    <eui-badge euiSizeS [euiSuccess]="myForm.touched" [euiDanger]="!myForm.touched">
                        {{ myForm.touched ? 'TOUCHED' : 'UNTOUCHED' }}
                    </eui-badge>
                    @if (myForm.disabled) {
                        <eui-badge euiSizeS [euiSuccess]="myForm.disabled">
                            DISABLED
                        </eui-badge>
                    }
                </div>
            </div>
        </div>

        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button form="my-form" type="submit" euiButton euiPrimary class="eui-u-mr-m eui-u-mb-m">Submit form</button>
            <button euiButton euiPrimary euiOutline (click)="changeValue()" class="eui-u-mr-m eui-u-mb-m">Change value</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiGrowlService } from '@eui/core';


@Component({
    // tslint:disable-next-line
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
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
export class TemplateDrivenFormsComponent {

    public isReadonly = false;
    public isDisabled = false;
    public model: string;
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

    public changeValue() {
        const value = this.options[Math.floor(Math.random() * this.options.length)].value;
        this.model = value;
    }

    public onSubmitModel(form: NgForm) {
        console.log(form);
        if (form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

}
```

