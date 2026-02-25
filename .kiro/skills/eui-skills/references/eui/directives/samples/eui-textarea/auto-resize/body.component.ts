import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    template: `
        <label euiLabel for="form-autoresize">With Form</label>
        <form [formGroup]="form">
            <textarea euiTextArea id="form-autoresize" name="story" autoResize="true"
                      formControlName="control"></textarea>
        </form>
        <br>
        <button euiButton (click)="changeValue()">Change value</button>
    `,
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_TEXTAREA,
        ...EUI_LABEL,
    ],
})
export class BodyComponent {

    public form: FormGroup = new FormGroup({
        control: new FormControl(`aaaa ` + 'aaaa '.repeat(1000) + 'END'),
    });

    constructor(private euiDialogService: EuiDialogService) {
    }

    public closeDialog() {
        this.euiDialogService.closeDialog();
    }

    changeValue() {
        this.form.get('control').setValue(this.form.get('control').value + '\n' + Math.random() * 100);
    }
}
