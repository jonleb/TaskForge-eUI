import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule as NgReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'isDisabled',
    templateUrl: './component.html',
    imports: [NgReactiveFormsModule, ...EUI_DATEPICKER, JsonPipe],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class IsDisabledComponent implements OnInit {

    public value = new Date('06/08/1987');
    public form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            datepicker: [
                { value: new Date('06/08/1987'), disabled: true },
                [Validators.required],
            ],
        });
    }

}
