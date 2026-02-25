import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, take, tap } from 'rxjs';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // tslint:disable-next-line
    selector: "reactive-forms",
    templateUrl: "component.html",
    imports: [
        FormsModule,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        EuiMaxLengthDirective,
        ...EUI_BUTTON,
    ],
})
export class ReactiveFormComponent {
    public model;
    public counter: number;
    private sub;

    constructor() {
        this.reset();
    }

    reset() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.model = "";
        this.counter = 0;
        this.sub = interval(250)
            .pipe(
                take(25),
                tap(() => this.counter++)
            )
            .subscribe(() => (this.model += "a"));
    }
}
