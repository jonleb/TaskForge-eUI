import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BLOCK_CONTENT } from '@eui/components/eui-block-content';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BLOCK_DOCUMENT } from '@eui/components/eui-block-document';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

import { BlockedContentComponent } from '../../dummy-components/blocked-content.component';

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
        ...EUI_BLOCK_DOCUMENT,
        ...EUI_INPUT_TEXT,
    ],
})
export class WithEuiBlockContentComponent implements OnInit {
    public form: FormGroup;
    public isBlocked = false;

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

    public openWithService(): void {
        let f: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog with eui-block-content',
            content: 'Dialog content',
            isHandleCloseOnAccept: true,
            bodyComponent: {
                component: BlockedContentComponent,
                config: {
                    isBlocked: false,
                    onFormValueChange: (form: FormGroup) => {
                        f = form;
                    },
                },
            },
            accept: (instances) => {
                instances.bodyComponent.markAllAsTouched();
                if (f.valid) {
                    instances.bodyComponent.isBlocked = true;
                    this.growlService.growl({
                        severity: 'info',
                        summary: 'Verifying backend business rules...',
                    });
                    setTimeout(() => {
                        instances.bodyComponent.isBlocked = false;
                        this.growlService.growl({
                            severity: 'success',
                            summary: 'Back-end verified!',
                            detail: 'The form data has been successfully saved',
                        });
                        this.euiDialogService.closeDialog();
                    }, 2500);
                } else {
                    this.growlService.growl({
                        severity: 'danger',
                        summary: 'Something went wrong...',
                        detail: 'The form is invalid, please fix the errors first.',
                    });
                }
            },
        });
        this.euiDialogService.openDialog(config);
    }

}
