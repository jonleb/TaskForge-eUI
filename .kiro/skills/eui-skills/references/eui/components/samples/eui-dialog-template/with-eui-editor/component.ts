import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    selector: 'with-eui-editor',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_TEXT,
    ],
})
export class WithEuiEditorComponent implements OnInit {
    public form: FormGroup;

    @ViewChild('dialog') dialog: EuiDialogComponent;

    constructor(
        private euiDialogService: EuiDialogService,
        private fb: FormBuilder,
        public asService: EuiAppShellService,
        public growlService: EuiGrowlService,
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            subjectValue: ['', Validators.required],
            emailValue: ['', Validators.required],
        });
    }

    public onSubmitForm() {
        if (this.isFormValid()) {
            this.closeDialog();
        } else {
            this.growlService.growl({
                severity: 'danger',
                summary: 'Something went wrong...',
                detail: 'The form is invalid, please fix the errors first.',
            });
        }
    }

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public isFormValid(): boolean {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            return true;
        }
        return false;
    }

    public resetForm() {
        this.form.reset();
    }

    public closeDialog(): void {
        this.euiDialogService.closeDialog();
    }

    public render(controlName: string): boolean {
        return (
            this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required')
        );
    }
}
