import { Component, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_MESSAGE_BOX, EuiMessageBoxComponent } from "@eui/components/eui-message-box";
import { EuiGrowlService } from '@eui/core';
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_SELECT } from "@eui/components/eui-select";

import { Dialog1TemplateComponent } from '../../dummy-components/dialog1-template-component';

@Component({
    // eslint-disable-next-line
    selector: 'multiple-dialog-template',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_DIALOG,
        ...EUI_MESSAGE_BOX,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_GROUP,
        ...EUI_BUTTON,
        ...EUI_SELECT,
        Dialog1TemplateComponent,
        JsonPipe,
    ],
})
export class MultipleDialogTemplateComponent {

    public formValues: FormGroup;
    public injectedFormValues: any;

    @ViewChild('dialog') dialog: EuiDialogComponent;
    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;
    @ViewChild('dialogContentComponent') dialogContentComponent: Dialog1TemplateComponent;

    constructor(private euiDialogService: EuiDialogService, public growlService: EuiGrowlService) {}

    public openDialog(): void {
        const dialog = this.dialog.openDialog();
    }

    public onAccept(): void {
        this.dialogContentComponent.checkForm();
        if (this.formValues.valid) {
            this.injectedFormValues = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.euiDialogService.closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        }
    }

    public onDismiss(): void {
        this.messageBox.openMessageBox();
    }

    public onFormValueChange(form: FormGroup): void {
        this.formValues = form;
    }

    public onMessageBoxAccept(): void {
        this.messageBox.closeMessageBox();
        this.dialog.closeDialog();
    }
}
