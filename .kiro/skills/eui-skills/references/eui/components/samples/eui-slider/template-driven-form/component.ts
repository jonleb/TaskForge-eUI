import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SLIDER, IEuiSliderValues } from '@eui/components/eui-slider';

@Component({
    // eslint-disable-next-line
    selector: 'template-driven-form',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_SLIDER,
        ...EUI_BUTTON,
        JsonPipe,
    ],
})
export class TemplateDrivenFormComponent {

    public sliderValue: IEuiSliderValues = { start: 30 };
    public rangeSliderValue: IEuiSliderValues = { start: 10, end: 90 };
    
}
