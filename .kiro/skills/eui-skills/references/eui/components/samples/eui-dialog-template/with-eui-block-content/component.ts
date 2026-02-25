import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BLOCK_CONTENT } from '@eui/components/eui-block-content';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    selector: 'with-eui-block-content',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_BLOCK_CONTENT,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_TEXT,
    ],
})
export class WithEuiBlockContentComponent implements OnInit {
    public form: FormGroup;
    public isBlocked = false;

    @ViewChild('dialog') dialog: EuiDialogComponent;

    constructor(
        private euiDialogService: EuiDialogService,
        private fb: FormBuilder,
        public asService: EuiAppShellService,
        public growlService: EuiGrowlService,
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    public onSubmitForm() {
        if (this.isFormValid()) {
            this.simulateBackendBusinessValidation2();
        } else {
            this.growlService.growl({
                severity: 'danger',
                summary: 'Something went wrong...',
                detail: 'The form is invalid, please fix the errors first.',
            });
        }
    }

    public simulateBackendBusinessValidation2() {
        this.isBlocked = true;
        this.growlService.growl({
            severity: 'info',
            summary: 'Verifying backend business rules...',
        });
        setTimeout(() => {
            this.isBlocked = false;
            this.growlService.growl({
                severity: 'success',
                summary: 'Back-end verified!',
                detail: 'The form data has been successfully saved',
            });
            this.resetForm();
            this.dialog.closeDialog();
        }, 2500);
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
            this.form?.get(controlName).hasError('required')
        );
    }
}
