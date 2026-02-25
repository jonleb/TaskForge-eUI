---
description: Demonstrates radio button integration with Angular reactive forms using formControlName, including required validation, readonly state handling, and form status tracking.
id: reactive-forms
---

```html
<div class="row">
    <div class="col-md-6">
        <div class="doc-sample-section-title">Reactive forms</div>
        <form [formGroup]="form">
            <div euiInputGroup>
                <label euiLabel euiRequired>Select gender</label>
                <div class="eui-u-display-flex eui-u-flex-column">
                        @for (gender of genders; let i = $index; track $index) {
                            <div class="eui-u-inline-flex eui-u-mb-xs">
                                <input euiInputRadio
                                        id="radio-{{gender}}"
                                        name="radioForm"
                                        [value]="gender"
                                        [readonly]="isReadonly"
                                        formControlName="radioForm" />
                                <label euiLabel for="radio-{{gender}}">{{gender}}</label>
                            </div>
                        }
                </div>
                @if (!isReadonly && render('radioForm')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>
        </form>
    </div>
    <div class="col-md-6">
        <div class="doc-sample-section-title">Reactive Form content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{form.getRawValue() | json}}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold mr-3">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="form.status === 'VALID'" [euiDanger]="form.status !== 'VALID'">
                        {{ form.status }}
                    </eui-badge>
                </div>
            </div>
        </div>
        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button euiButton euiPrimary (click)="onSubmit()" class="eui-u-mr-m eui-u-mb-m">Submit form</button>
            <button euiButton euiPrimary euiOutline (click)="onToggleReadonly()" class="eui-u-mr-m eui-u-mb-m">Toggle Readonly</button>
            <button euiButton euiPrimary euiOutline (click)="onToggleDisabled()" class="eui-u-mr-m eui-u-mb-m">Toggle Disabled</button>
            <button euiButton euiPrimary euiOutline (click)="changeState()" class="eui-u-mr-m eui-u-mb-m">Change value</button>
            <button euiButton euiPrimary euiOutline (click)="resetForm()" class="eui-u-mr-m eui-u-mb-m">Reset</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EuiGrowlService } from '@eui/core';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_RADIO,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent {

    public isReadonly = false;
    public isDisabled = false;
    public form: FormGroup = new FormGroup({
        radioForm: new FormControl({ value: null, disabled: this.isDisabled }, [Validators.required]),
    });
    public genders = ['male', 'female', 'other'];

    public growlService = inject(EuiGrowlService);

    public changeState() {
        const radioControl = this.form.get('radioForm');
        const formValue = radioControl.value;
        radioControl.setValue(formValue === 'male' ? 'female' : 'male');
    }

    public onSubmit() {
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

    public onToggleDisabled() {
        this.isDisabled = !this.isDisabled;
        this.isDisabled ? this.form.disable() : this.form.enable();
    }

    public resetForm() {
        this.form.reset();
    }

    public render(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }
}
```

