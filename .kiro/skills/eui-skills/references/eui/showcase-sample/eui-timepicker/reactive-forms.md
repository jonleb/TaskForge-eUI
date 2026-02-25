---
description: Reactive Forms examples covering default mode, seconds, one-input masked mode, custom placeholder, and disabled controls.
id: reactive-forms
---

```html
<div class="doc-sample-section-title">Reactive forms with default arrows view</div>
<form [formGroup]="form">
    <div class="row">
        <div class="col">
            <eui-timepicker formControlName="timepickerControl" />
        </div>

        <div class="col">
            <pre class="eui-u-text-pre">{{ form.value | json }}</pre>
        </div>
    </div>
</form>

<div class="doc-sample-section-title">Reactive forms with seconds</div>
<form [formGroup]="form2">
    <div class="row">
        <div class="col">
            <eui-timepicker hasSeconds formControlName="timepickerControlWithSeconds" />
        </div>

        <div class="col">
            <pre class="eui-u-text-pre">{{ form2.value | json }}</pre>
        </div>
    </div>
</form>

<div class="doc-sample-section-title">Reactive forms using one input field with mask</div>
<form [formGroup]="form3">
    <div class="row">
        <div class="col-md-4">
            <div euiInputGroup>
                <label euiLabel for="timepicker">Sample label</label>
                <eui-timepicker inputId="timepicker" isOneInputField formControlName="oneInputControl" />
            </div>
        </div>
        <div class="col-md-4 offset-md-2">
            <pre class="eui-u-text-pre">{{ form3.value | json }}</pre>
        </div>
    </div>
</form>

<div class="doc-sample-section-title">Reactive forms using one input field with mask, seconds and custom placeholder</div>
<form [formGroup]="form4">
    <div class="row">
        <div class="col-md-4">
            <eui-timepicker hasSeconds isOneInputField formControlName="oneInputControl" placeholder="Hours:Mins:Secs" />
        </div>
        <div class="col-md-4 offset-md-2">
            <pre>{{ form4.value | json }}</pre>
        </div>
    </div>
</form>

<div class="doc-sample-section-title">Reactive forms with disabled state via FormControl</div>
<form [formGroup]="form5">
    <div class="row">
        <div class="col">
            <eui-timepicker hasSeconds formControlName="disabledTimepicker" />
        </div>
        <div class="col">
            <pre class="eui-u-text-pre">{{ form5.value | json }}, disabled: {{ form5.get('disabledTimepicker')?.disabled | json }}</pre>
        </div>
    </div>
</form>

<div class="doc-sample-section-title">Reactive forms on one input field with disabled state via FormControl</div>
<form [formGroup]="form6">
    <div class="row">
        <div class="col">
            <eui-timepicker hasSeconds isOneInputField formControlName="disabledOneInputTimepicker" />
        </div>
        <div class="col">
            <pre class="eui-u-text-pre">{{ form6.value | json }}, disabled: {{ form6.get('disabledOneInputTimepicker')?.disabled | json }}</pre>
        </div>
    </div>
</form>
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'reactiveForms',
    templateUrl: './component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_TIMEPICKER,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsComponent implements OnInit {
    private fb = inject(FormBuilder);


    public form: FormGroup;
    public form2: FormGroup;
    public form3: FormGroup;
    public form4: FormGroup;
    public form5: FormGroup;
    public form6: FormGroup;

    ngOnInit() {
        this.form = this.fb.group({
            timepickerControl: [{
                hours: 9,
                mins: 20 },
                [Validators.required],
            ],
        });
        this.form2 = this.fb.group({
            timepickerControlWithSeconds: [{
                hours: 11,
                mins: 30,
                secs: 45,
            },
            ],
        });
        this.form3 = this.fb.group({
            oneInputControl: [{
                hours: 15,
                mins: 39,
                secs: 56,
            }, [Validators.required],
            ],
        });
        this.form4 = this.fb.group({
            oneInputControl: [{
                hours: 5,
                mins: 3,
                secs: 6,
            }, [Validators.required],
            ],
        });
        this.form5 = this.fb.group({
            disabledTimepicker: [{
                value: { hours: 14, mins: 30, secs: 50 },
                disabled: true
            }]
        });
        this.form6 = this.fb.group({
            disabledOneInputTimepicker: [{
                value: { hours: 14, mins: 30, secs: 50 },
                disabled: true
            }]
        });
    }
}
```

