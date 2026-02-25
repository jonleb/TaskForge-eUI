import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule as NgReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactiveForms',
    templateUrl: './component.html',
    imports: [
        NgReactiveFormsModule,
        ...EUI_TIMEPICKER,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
})
export class ReactiveFormsComponent implements OnInit {

    public form: FormGroup;
    public form2: FormGroup;
    public form3: FormGroup;
    public form4: FormGroup;
    public form5: FormGroup;
    public form6: FormGroup;

    constructor(private fb: FormBuilder) {}

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
