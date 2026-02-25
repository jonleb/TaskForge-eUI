---
description: Demonstrates checkbox integration with template-driven forms using ngModel for two-way data binding, including readonly state and form submission.
id: template-driven-form
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Two-way data binding (ngModel)</div>
        <form #myForm="ngForm" id="my-form" validate (ngSubmit)="onSubmitModel(myForm)">
            <div euiInputGroup>
                <label euiLabel>Select language(s)</label>
                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input  id="reactive-checkbox-model-en"
                            name="checkbox-en"
                            euiInputCheckBox
                            [readonly]="isReadonly"
                            [(ngModel)]="modelCheckedValueEN"/>
                    <label euiLabel for="reactive-checkbox-model-en">English</label>
                </div>

                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input  id="reactive-checkbox-model-fr"
                            name="checkbox-fr"
                            euiInputCheckBox
                            [readonly]="isReadonly"
                            [(ngModel)]="modelCheckedValueFR"/>
                    <label euiLabel for="reactive-checkbox-model-fr">french</label>
                </div>

                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input  id="reactive-checkbox-model-es"
                            name="checkbox-es"
                            euiInputCheckBox
                            [readonly]="isReadonly"
                            [(ngModel)]="modelCheckedValueES"/>
                    <label euiLabel for="reactive-checkbox-model-es">spanish</label>
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
            <button euiButton euiPrimary euiOutline (click)="changeModelValues()" class="eui-u-mr-m eui-u-mb-m">Change value</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiGrowlService } from '@eui/core';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'template-driven-form',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDrivenFormComponent {

    public isReadonly = false;
    public modelCheckedValueEN = false;
    public modelCheckedValueFR = false;
    public modelCheckedValueES = false;
    public modelValue;

    public growlService = inject(EuiGrowlService);

    public changeModelValues() {
        this.modelValue = !this.modelValue;
        this.modelCheckedValueEN = !this.modelCheckedValueEN;
        this.modelCheckedValueFR = !this.modelCheckedValueFR;
        this.modelCheckedValueES = !this.modelCheckedValueES;
    }

    public onSubmitModel(form: NgForm) {
        this.growlService.growl({ severity: 'info', summary: 'SUBMIT', detail: 'The Form has been successfully submitted !' });
    }

}
```

