import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { FormsModule } from '@angular/forms';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // tslint:disable-next-line
    selector: "custom-calculator",
    templateUrl: "component.html",
    imports: [
        FormsModule,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        EuiMaxLengthDirective,
    ],
})
export class CustomCalculatorComponent implements AfterViewInit {
    public isChecked: false | true = true;
    public show = false;
    public textMax = false;
    @ViewChild("myInput") input: ElementRef<HTMLInputElement>;
    @ViewChild(EuiMaxLengthDirective) maxLengthDirective: EuiMaxLengthDirective; // First

    ngAfterViewInit(): void {
        this.maxLengthDirective.setLengthCalcFactory(this.customCalculator);
    }

    textMaxLengthReached(reached: boolean) {
        this.textMax = reached;
    }

    customCalculator = (value: string): number => {
        const valueLength = value?.replace(/a/g, "").length || 0;
        return valueLength;
    };
}
