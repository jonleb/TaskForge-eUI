import { Component } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    // eslint-disable-next-line
    selector: 'format-value',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
})
export class FormatValueComponent {

    addLabel(value: number): string {
        if (Math.abs(value) > 1) {
            return value + ' balloons';
        } else {
            return value + ' balloon';
        }
    }

    decimal(value: number): string {
        return (1 + (value / 100)).toFixed(2);
    }

}
