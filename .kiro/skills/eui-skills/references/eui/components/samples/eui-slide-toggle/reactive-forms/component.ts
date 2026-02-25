import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule as NgReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_BADGE } from "@eui/components/eui-badge";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        NgReactiveFormsModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_BADGE,
        ...EUI_BUTTON,
        JsonPipe
    ],
})
export class ReactiveFormsComponent implements OnInit {

    public form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            slideControl: new FormControl<boolean>(false, Validators.requiredTrue),
        });
    }

    public onSubmit(): void {
        console.log(this.form);
    }

    public onResetForm(): void {
        this.form.reset();
    }

    public onToggle(): void {
        this.form.get('slideControl').patchValue(this.form.get('slideControl').value ? false : true);
    }

    public onPatchValueTrue(): void {
        this.form.get('slideControl').patchValue(true);
    }

    public onPatchValueFalse(): void {
        this.form.get('slideControl').patchValue(false);
    }

    public onDisableField(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.form.get('slideControl').disabled ? this.form.get('slideControl').enable() : this.form.get('slideControl').disable();
    }
}
