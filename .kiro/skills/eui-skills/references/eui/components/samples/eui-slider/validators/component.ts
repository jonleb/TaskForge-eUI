import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SLIDER, IEuiSliderValues, sliderValidator } from '@eui/components/eui-slider';

@Component({
    // eslint-disable-next-line
    selector: 'validators',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_SLIDER,
        ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_ALERT,
    ],
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
