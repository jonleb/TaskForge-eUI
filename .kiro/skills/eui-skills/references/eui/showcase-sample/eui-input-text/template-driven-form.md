---
description: Template-driven forms with ngModel two-way binding, form validation, and input group addons integration.
id: template-driven-form
---

```html
<div class="row">
    <div class="col-md-7">

        <div class="doc-sample-section-title">Two-way data binding (ngModel)</div>
        <form #myForm="ngForm" id="my-form" novalidate (ngSubmit)="onSubmitModel(myForm)">
            <div euiInputGroup>
                <label euiLabel euiRequired for="text-model-driven">Label 1</label>
                <input euiInputText id="text-model-driven" name="text-model-driven" [(ngModel)]="model1" [readonly]="isReadonly" [disabled]="isDisabled" required [isInvalid]="myForm.invalid" />
                @if (myForm.status ==='INVALID') {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel for="text-model-driven-addon">Label 2</label>
                <div euiInputGroupAddOn>
                    @if (!isReadonly) {
                        <div euiInputGroupAddOnItem>
                            <eui-icon-svg icon="eui-home" size="s" fillColor="secondary" />
                        </div>
                    }
                    <input euiInputText id="text-model-driven-addon" name="text-model-driven-addon" [(ngModel)]="model2" [readonly]="isReadonly" [disabled]="isDisabled" />
                </div>
            </div>
        </form>
    </div>

    <div class="col-md-5">
        <div class="doc-sample-section-title">NgModel content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ myForm.value | json }}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="myForm.status === 'VALID'" [euiDanger]="myForm.status !== 'VALID'">
                        {{ myForm.status }}
                    </eui-badge>
                </div>
            </div>
        </div>

        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button form="my-form" type="submit" euiButton euiPrimary class="eui-u-mr-m eui-u-mb-m">Submit form</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';


@Component({
    // tslint:disable:max-line-length
    // tslint:disable-next-line
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        FormsModule,
        ReactiveFormsModule,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_ICON,
        JsonPipe,
    ],
    providers: [
        EuiGrowlService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDrivenFormsComponent {
    public isReadonly = false;
    public isDisabled = false;
    public model1 = 'Input text sample';
    public model2 = 'Input text sample with addon';

    public growlService = inject(EuiGrowlService);

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

