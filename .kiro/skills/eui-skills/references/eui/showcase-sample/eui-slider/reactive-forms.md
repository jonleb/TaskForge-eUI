---
description: Integrates slider and range slider with reactive form controls and actions.
id: reactive-forms
---

```html
<div [formGroup]="form">
    <div euiInputGroup>
        <label for="slider" euiLabel>Choose a value</label>
        <eui-slider id="slider" formControlName="slider" />
    </div>
    <div euiInputGroup>
        <label for="range-slider" euiLabel>Choose a range</label>
        <eui-slider id="range-slider" formControlName="rangeSlider" [hasRange]="true" />
    </div>
    
</div>

<br/>

<button (click)="onResetForm()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Reset</button>
<button (click)="onDisableField()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Toggle
    disabled
</button>
<button (click)="onReadOnlyField()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Toggle
    readonly
</button>
<button (click)="onPatchValue()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Patch value
</button>
<button (click)="onSubmit()" class="eui-u-mr-xs" euiButton euiPrimary type="button">Submit</button>
<br/>
```

```typescript
import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDER, IEuiSliderValues } from '@eui/components/eui-slider';
import { EuiGrowlService } from '@eui/core';

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_SLIDER,
        ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsComponent implements OnInit {

    public form: FormGroup;
    public isReadOnly = false;

    private growlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.form = new FormGroup({
            slider: new FormControl<IEuiSliderValues>({ start: 25 }),
            rangeSlider: new FormControl<IEuiSliderValues>({ start: 10, end: 60 }),
        });
    }

    public onResetForm(): void {
        this.form.reset();
    }

    public onDisableField(): void {
        this.form.get('slider').disabled ? this.form.get('slider').enable() : this.form.get('slider').disable();
        this.form.get('rangeSlider').disabled ? this.form.get('rangeSlider').enable() : this.form.get('rangeSlider').disable();
    }

    public onReadOnlyField(): void {
        this.isReadOnly = !this.isReadOnly;
    }

    public onPatchValue(): void {
        this.form.get('slider').patchValue({ start: 60 });
        this.form.get('rangeSlider').patchValue({ start: 30, end: 40 });
    }

    public onSubmit(): void {
        console.log(this.form.value);
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({
                severity: 'danger',
                summary: 'SUBMIT FAILED!',
                detail: 'Please fill in all required fields !',
            });
        } else {
            this.growlService.growl({
                severity: 'success',
                summary: 'SUBMIT SUCCESS',
                detail: 'The Form has been successfully submitted.',
            });
        }
    }
}
```

