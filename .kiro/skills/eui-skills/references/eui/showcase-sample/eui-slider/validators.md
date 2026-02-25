---
description: Demonstrates built-in slider validators and related error messages.
id: validators
---

```html
<div [formGroup]="form">
    <eui-slider formControlName="slider" />
    @if (this.form?.get('slider').invalid && this.form?.get('slider').touched && this.form?.get('slider').hasError('startMin')) {
        <eui-feedback-message euiDanger>The start value need to be bigger than <strong>{{ this.form?.get('slider').errors.startMin.required }}</strong></eui-feedback-message>
    }
    @if (this.form?.get('slider').invalid && this.form?.get('slider').touched && this.form?.get('slider').hasError('startMax')) {
        <eui-feedback-message euiDanger>The start value need to be smaller than <strong>{{ this.form?.get('slider').errors.startMax.required }}</strong></eui-feedback-message>
    }
    <br/>
    <br/>
    <eui-slider formControlName="rangeSlider" [hasRange]="true" />
    @if (this.form?.get('rangeSlider').invalid && this.form?.get('rangeSlider').touched && this.form?.get('rangeSlider').hasError('startMin')) {
        <eui-feedback-message euiDanger>The start value need to be bigger than <strong>{{ this.form?.get('rangeSlider').errors.startMin.required }}</strong></eui-feedback-message>
    }
    @if (this.form?.get('rangeSlider').invalid && this.form?.get('rangeSlider').touched && this.form?.get('rangeSlider').hasError('startMax')) {
        <eui-feedback-message euiDanger>The start value need to be smaller than <strong>{{ this.form?.get('rangeSlider').errors.startMax.required }}</strong></eui-feedback-message>
    }
    @if (this.form?.get('rangeSlider').invalid && this.form?.get('rangeSlider').touched && this.form?.get('rangeSlider').hasError('endMin')) {
        <eui-feedback-message euiDanger>The end value need to be bigger than <strong>{{ this.form?.get('rangeSlider').errors.endMin.required }}</strong></eui-feedback-message>
    }
    @if (this.form?.get('rangeSlider').invalid && this.form?.get('rangeSlider').touched && this.form?.get('rangeSlider').hasError('endMax')) {
        <eui-feedback-message euiDanger>The end value need to be bigger than <strong>{{ this.form?.get('rangeSlider').errors.endMax.required }}</strong></eui-feedback-message>
    }
</div>
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SLIDER, IEuiSliderValues, sliderValidator } from '@eui/components/eui-slider';

@Component({
    selector: 'validators',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_SLIDER,
        ...EUI_FEEDBACK_MESSAGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidatorsComponent implements OnInit {

    public form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            slider: new FormControl<IEuiSliderValues>({ start: 25 }, [sliderValidator({ startMin: 20, startMax: 40 })]),
            rangeSlider: new FormControl<IEuiSliderValues>({ start: 10, end: 60 }, [sliderValidator({ startMin: 5, startMax: 50, endMin: 30, endMax: 90 })]),
        });
    }

}
```

