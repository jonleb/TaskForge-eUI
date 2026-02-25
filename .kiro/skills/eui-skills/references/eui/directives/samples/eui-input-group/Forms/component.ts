import { Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormsModule as AngularFormsModule,
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { markFormGroupTouched } from '@eui/core';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_HELPER_TEXT } from '@eui/components/eui-helper-text';
import { maxLengthBytes } from '@eui/components/validators';

@Component({
    // tslint:disable-next-line
    selector: 'Forms',
    templateUrl: 'component.html',
    styles: [`ul li {
        list-style:outside;
        margin-left: 1rem;
    }`],
    imports: [
        AngularFormsModule,
        ReactiveFormsModule,
        ...EUI_ALERT,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_HELPER_TEXT,
        JsonPipe,
    ],
})
export class FormsComponent implements OnInit {

    public form: FormGroup;
    private fb: FormBuilder = inject(FormBuilder);

    ngOnInit(): void {
        this.form = this.fb.group({
            multiErrors: new FormControl('', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50),
                Validators.email,
            ]),
            maxLengthBytes: new FormControl('', maxLengthBytes(6)),
        });
    }

    public onSubmit() {
        markFormGroupTouched(this.form.controls);
    }

    public onResetForm() {
        this.form.reset();
    }

}
