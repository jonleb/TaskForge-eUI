---
description: Integration with Angular reactive forms using FormControl, validation, and programmatic value updates.
id: reactive-forms
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Reactive form</div>
        <form [formGroup]="formGroup">

            <div euiInputGroup>
                <label euiLabel euiRequired for="input-amount-1">Enter amount</label>
                <div euiInputGroupAddOn>
                    <input euiInputNumber  id="input-amount-1" formControlName="amount1" aria-label="within form" fractionDigits="2" [readonly]="readonly"/>
                    @if (!readonly) {
                        <button euiButton euiPrimary euiOutline (click)="onSubmit()">Submit</button>
                    }
                </div>
                @if (render('amount1')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>
            <div euiInputGroup>
                <label euiLabel for="input-amount-2">Enter amount</label>
                <div euiInputGroupAddOn>
                    @if (!readonly) {
                        <div euiInputGroupAddOnItem>
                            <eui-icon-svg icon="currency-eur:regular" size="s" fillColor="secondary" />
                        </div>
                    }
                    <input euiInputNumber
                            id="input-amount-2"
                            name="input-amount-2"
                            formControlName="amount2"
                            aria-label="with addon"
                            fractionDigits="2"
                            [readonly]="readonly"/>
                </div>
            </div>
        </form>
    </div>
    <div class="col-md-5">
        <div class="doc-sample-section-title">Reactive Form content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ formGroup.value | json }}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold mr-3">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="formGroup.status === 'VALID'" [euiDanger]="formGroup.status !== 'VALID'">
                        {{ formGroup.status }}
                    </eui-badge>
                </div>
            </div>
        </div>
        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button euiButton euiPrimary (click)="onSubmit()" class="eui-u-mr-m eui-u-mb-m">Submit form</button>
            <button euiButton euiOutline euiPrimary (click)="onToggleReadonly()" class="eui-u-mr-m eui-u-mb-m">Toggle read-only</button>
            <button euiButton euiOutline euiPrimary (click)="onToggleDisabled()" class="eui-u-mr-m eui-u-mb-m">Toggle disabled</button>
            <button euiButton euiOutline euiPrimary (click)="onPatchValue()" class="eui-u-mr-m eui-u-mb-m">Change value</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent {
    public readonly = false;
    public disableAmount1 = false;
    public disableAmount2 = false;
    public formGroup: FormGroup = new FormGroup({
        amount1: new FormControl({value: 999999.02, disabled: this.disableAmount1}, [Validators.required]),
        amount2: new FormControl({value: 100000, disabled: this.disableAmount2}),
    });

    public growlService = inject(EuiGrowlService);

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
```

