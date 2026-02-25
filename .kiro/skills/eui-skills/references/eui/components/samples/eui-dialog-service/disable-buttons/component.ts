import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from '@angular/common';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_AUTOCOMPLETE } from "@eui/components/eui-autocomplete";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

import { DialogServiceDisableButtonsComponent, DialogServiceDisableButtonsComponentConfig } from '../../dummy-components/dialog-service-disable-buttons-component';

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
        JsonPipe,
    ],
})
export class DisableButtonsComponent {

    public formValues: FormGroup;
    public injectedFormValues: any;

    constructor(private euiDialogService: EuiDialogService, public growlService: EuiGrowlService,) {}

    public openWithService(): void {
        let componentForm: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: DialogServiceDisableButtonsComponent,
                config: new DialogServiceDisableButtonsComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;
                        if (form.invalid) {
                            this.euiDialogService.disableAcceptButton();
                        } else {
                            this.euiDialogService.enableAcceptButton();
                        }
                    },
                }),
            },
            clickOutside: (instances) => {
            },
            open: () => {
            },
            close: (instances) => {
            },
            dismiss: (instances) => {
            },
            accept: (instances) => {
                this.injectedFormValues = componentForm;
                this.growlService.growl({
                    severity: 'success',
                    summary: 'SUBMIT SUCCESS',
                    detail: 'The Form has been successfully submitted.',
                });
            },
        });

        const d = this.euiDialogService.openDialog(config);
    }

}
