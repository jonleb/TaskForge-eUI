---
description: Two-way data binding with ngModel for template-driven form integration and state management.
id: template-driven-form
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Two-way data binding (ngModel)</div>
        <form #myForm="ngForm" id="my-form" novalidate (ngSubmit)="onSubmitModel(myForm)">
            <div euiInputGroup>
                <label euiLabel for="text-model-driven">Enter amount</label>
                <input euiInputNumber
                        id="text-model-driven"
                        name="text-model-driven"
                        aria-label="with two-way data binding"
                        fractionDigits="2"
                        [(ngModel)]="myVal"
                        [readonly]="readonly"
                        [disabled]="disableAmount1"/>
            </div>
            <div euiInputGroup>
                <label euiLabel for="text-model-driven-addon">Enter amount</label>
                <div euiInputGroupAddOn>
                    @if (!readonly) {
                        <div euiInputGroupAddOnItem>
                            <eui-icon-svg icon="currency-eur:regular" size="s" fillColor="secondary" />
                        </div>
                    }
                    <input euiInputNumber
                            id="text-model-driven-addon"
                            name="text-model-driven-addon"
                            [(ngModel)]="myVal2"
                            aria-label="with two-way data binding and addon"
                            fractionDigits="2"
                            [readonly]="readonly"
                            [disabled]="disableAmount2" />
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
                    <div class="eui-u-f-bold mr-3">Form status</div>
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
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';


@Component({
    // tslint:disable-next-line
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_NUMBER,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDrivenFormsComponent {
    public myVal = 9999.111;
    public myVal2 = 100000;
    public readonly = false;
    public disableAmount1 = false;
    public disableAmount2 = false;

    public growlService = inject(EuiGrowlService);

    public onSubmitModel(form: NgForm) {
        console.log(form);
        if (form.status !== 'VALID') {
            this.growlService.growl({severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !'});
        } else {
            this.growlService.growl({severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.'});
        }
    }

}
```

