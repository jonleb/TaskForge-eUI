import { Component, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_AUTOCOMPLETE } from "@eui/components/eui-autocomplete";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

import { DummyBodyTemplateComponent } from '../../dummy-components/dummy-body-template-component';
import { DialogTemplateDisableButtonsComponent } from "../../dummy-components/dialog-template-disable-buttons-component";

@Component({
    selector: 'disable-buttons',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        DialogTemplateDisableButtonsComponent,
        JsonPipe,
    ],
})
export class DisableButtonsComponent {

    public formValues: FormGroup;
    public injectedFormValues: any;

    @ViewChild('dialog') dialog: EuiDialogComponent;
    @ViewChild('bodyComponent') bodyComponent: DummyBodyTemplateComponent;

    constructor(public growlService: EuiGrowlService,) {}

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public onFormValueChange(form: FormGroup): void {
        this.formValues = form;
        if (this.dialog) {
            if (form.invalid) {
                this.dialog.disableAcceptButton();
            } else {
                this.dialog.enableAcceptButton();
            }
        }
    }

    public onAcceptButtonDisable(): void {
        this.dialog.disableAcceptButton();
    }

    public onAcceptButtonEnable(): void {
        this.dialog.enableAcceptButton();
    }

    public onDismissButtonDisable(): void {
        this.dialog.disableDismissButton();
    }

    public onDismissButtonEnable(): void {
        this.dialog.enableDismissButton();
    }

    public onAccept(): void {
        this.injectedFormValues = this.formValues.value;
        this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
    }

}
