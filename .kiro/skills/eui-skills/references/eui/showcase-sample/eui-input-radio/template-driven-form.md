---
description: Shows radio button integration with template-driven forms using ngModel, including required validation, readonly/disabled states, and form submission.
id: template-driven-form
---

```html
<div class="row">
    <div class="col-md-6">
        <div class="doc-sample-section-title">Two-way data binding (ngModel)</div>
        <form #myForm="ngForm" id="my-form" (ngSubmit)="onSubmitModel(myForm)">
            <div euiInputGroup>
                <label euiLabel euiRequired>Select gender</label>

                <div class="eui-u-display-flex eui-u-flex-column">
                    <div class="eui-u-inline-flex eui-u-mb-xs">
                        <input euiInputRadio id="model-gender-m" [readonly]="isReadonly" [disabled]="isDisabled" value="male" name="model-gender" ngModel required />
                        <label euiLabel for="model-gender-m">Male</label>
                    </div>
                    <div class="eui-u-inline-flex eui-u-mb-xs">
                        <input euiInputRadio id="model-gender-f" [readonly]="isReadonly" [disabled]="isDisabled" value="female" name="model-gender" ngModel required />
                        <label euiLabel for="model-gender-f">Female</label>
                    </div>
                    <div class="eui-u-inline-flex eui-u-mb-xs">
                        <input euiInputRadio id="model-gender-o" [readonly]="isReadonly" [disabled]="isDisabled" value="other" name="model-gender" ngModel required />
                        <label euiLabel for="model-gender-o">Other</label>
                    </div>
                    <div class="eui-u-inline-flex eui-u-mb-xs">
                        @if (!isReadonly && myForm.status !== 'VALID') {
                            <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                        }
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="col-md-6">
        <div class="doc-sample-section-title">NgModel content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ myForm.value | json }}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold mr-3">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="myForm.status === 'VALID'" [euiDanger]="myForm.status !== 'VALID'">
                        {{ myForm.status }}
                    </eui-badge>
                </div>
            </div>
        </div>

        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button form="my-form" type="submit" [disabled]="!myForm.valid" euiButton euiPrimary class="eui-u-mr-m eui-u-mb-m">Submit form</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
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
export class TemplateDrivenFormsComponent {

    public isReadonly = false;
    public isDisabled = false;

    public growlService = inject(EuiGrowlService);

    public onSubmitModel(form: NgForm) {
        if (form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

}
```

