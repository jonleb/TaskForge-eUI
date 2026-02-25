import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

import { EditorComponent } from '../../dummy-components/editor.component';

@Component({
    selector: 'with-eui-editor',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        EuiEditorModule,
        ...EUI_INPUT_TEXT,
    ],
})
export class WithEuiEditorComponent implements OnInit {
    public form: FormGroup;

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

    public openWithService(): void {
        let f: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog with eui-editor',
            isHandleCloseOnAccept: true,
            bodyComponent: {
                component: EditorComponent,
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
                    this.closeDialog();
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

    public closeDialog(): void {
        this.euiDialogService.closeDialog();
    }

}
