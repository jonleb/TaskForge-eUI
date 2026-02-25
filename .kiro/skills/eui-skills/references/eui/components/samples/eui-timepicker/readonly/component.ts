import { JsonPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule as NgReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    // eslint-disable-next-line
    selector: 'readOnly',
    templateUrl: './component.html',
    imports: [NgReactiveFormsModule, ...EUI_TIMEPICKER, JsonPipe],
})
export class ReadOnlyComponent implements OnInit {

    public form: FormGroup;
    private fb: FormBuilder = inject(FormBuilder);

    ngOnInit() {
        this.form = this.fb.group({
            timepickerControl: [
                {
                    hours: 19,
                    mins: 28
                },
                [Validators.required],
            ],
        });
    }
}
