---
description: Reactive form binding with validation and control actions.
id: reactive-forms
---

```html
<div class="row">
    <div class="col-md-6">
        <form [formGroup]="form">
            <div euiInputGroup>
                <div class="eui-u-flex eui-u-flex-wrap">
                    <div class="eui-u-flex eui-u-mr-s">
                        <span class="eui-u-mr-s">false</span>
                        <eui-slide-toggle formControlName="slideControl" id="slideControl" />
                        <span class="eui-u-ml-s">true</span>
                    </div>
                </div>
                @if (form.status === 'INVALID' && (form.get('slideControl').touched || form.get('slideControl').dirty)) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>
        </form>
    </div>

    <div class="col-md-6">
        <strong>Reactive Form content</strong>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ form.value | json }}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="form.status === 'VALID'" [euiDanger]="form.status === 'INVALID'">
                        {{ form.status }}
                    </eui-badge>
                </div>
            </div>
        </div>

        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button type="button" euiButton euiPrimary euiSizeS (click)="onSubmit()" class="eui-u-mr-m eui-u-mb-m">Submit</button>
            <button type="button" euiButton euiOutline euiPrimary euiSizeS (click)="onResetForm()" class="eui-u-mr-m eui-u-mb-m">Reset</button>
            <button type="button" euiButton euiOutline euiPrimary euiSizeS (click)="onToggle()" class="eui-u-mr-m eui-u-mb-m">Toggle</button>
            <button type="button" euiButton euiOutline euiPrimary euiSizeS (click)="onPatchValueTrue()" class="eui-u-mr-m eui-u-mb-m">Patch value to true</button>
            <button type="button" euiButton euiOutline euiPrimary euiSizeS (click)="onPatchValueFalse()" class="eui-u-mr-m eui-u-mb-m">Patch value to false</button>
            <button type="button" euiButton euiOutline euiPrimary euiSizeS (click)="onDisableField()" class="eui-u-mr-m eui-u-mb-m">
                @if (form.get('slideControl').disabled) {
                    <span>Enable</span>
                }
                @if (!form.get('slideControl').disabled) {
                    <span>Disable</span>
                }
            </button>
        </div>
    </div>
</div>
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_BADGE } from "@eui/components/eui-badge";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_BADGE,
        ...EUI_BUTTON,
        JsonPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsComponent implements OnInit {

    public form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            slideControl: new FormControl<boolean>(false, Validators.requiredTrue),
        });
    }

    public onSubmit(): void {
        console.log(this.form);
    }

    public onResetForm(): void {
        this.form.reset();
    }

    public onToggle(): void {
        this.form.get('slideControl').patchValue(this.form.get('slideControl').value ? false : true);
    }

    public onPatchValueTrue(): void {
        this.form.get('slideControl').patchValue(true);
    }

    public onPatchValueFalse(): void {
        this.form.get('slideControl').patchValue(false);
    }

    public onDisableField(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.form.get('slideControl').disabled ? this.form.get('slideControl').enable() : this.form.get('slideControl').disable();
    }
}
```

