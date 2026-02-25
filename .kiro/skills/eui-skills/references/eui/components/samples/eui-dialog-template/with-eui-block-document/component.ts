import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BLOCK_DOCUMENT } from '@eui/components/eui-block-document';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    selector: 'with-eui-block-document',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BLOCK_DOCUMENT,
        ...EUI_INPUT_TEXT,
    ],
})
export class WithEuiBlockDocumentComponent implements OnInit {
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
            this.simulateBackendBusinessValidation();
        } else {
            this.growlService.growl({
                severity: 'danger',
                summary: 'Something went wrong...',
                detail: 'The form is invalid, please fix the errors first.',
            });
        }
    }

    public simulateBackendBusinessValidation() {
        this.asService.isBlockDocumentActive = true;
        this.growlService.growl({
            severity: 'info',
            summary: 'Verifying backend business rules...',
        });
        setTimeout(() => {
            this.asService.isBlockDocumentActive = false;
            this.growlService.growl({
                severity: 'success',
                summary: 'Back-end verified!',
                detail: 'The form data has been successfully saved',
            });
            this.euiDialogService.closeDialog();
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
