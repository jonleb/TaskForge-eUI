import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_DIALOG, EuiDialogComponentInstances, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiMessageBoxConfig, EuiMessageBoxService } from '@eui/components/eui-message-box';
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { MsgFooterComponent, MsgFooterComponentConfig } from '../../dummy-components/with-msg-box-footer.component';
import { MsgFormComponent, MsgFormComponentConfig } from '../../dummy-components/with-msg-box-form.component';

@Component({
    // eslint-disable-next-line
    selector: 'with-msg-box',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_TEXT,
        ...EUI_ALERT,
        ...EUI_DIALOG,
        JsonPipe,
    ],
})
export class EuiDialogWithEuiMessageBoxComponent {

    public formValues = {};

    constructor(private euiDialogService: EuiDialogService,
                private euiMessageBoxService: EuiMessageBoxService,
                public growlService: EuiGrowlService) {
    }

    public openDialog(): void {
        let componentForm: FormGroup;
        let componentInstances: EuiDialogComponentInstances<unknown, MsgFormComponent, MsgFooterComponent>;

        const config = new EuiDialogConfig({
            title: 'Fill the form',
            bodyComponent: {
                component: MsgFormComponent,
                config: new MsgFormComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;

                        if (componentInstances.footerComponent) {
                            if (form.valid) {
                                componentInstances.footerComponent.disableSubmitButton();
                            } else {
                                componentInstances.footerComponent.enableSubmitButton();
                            }
                        }
                    },
                }),
            },
            footerComponent: {
                component: MsgFooterComponent,
                config: new MsgFooterComponentConfig({
                    accept: () => {
                        const messageBoxConfig = new EuiMessageBoxConfig({
                            title: 'Confirm',
                            content: "<p class='eui-u-text-paragraph'>Are you sure you want to save ?</p>",
                            isHandleCloseOnAccept: true,
                            accept: () => {
                                this.growlService.growl({
                                    severity: 'success',
                                    summary: 'SUBMIT SUCCESS',
                                    detail: 'The Form has been successfully submitted.',
                                });
                                this.euiDialogService.closeDialog();
                                this.euiMessageBoxService.closeMessageBox();
                                this.formValues = componentForm.value;
                            },
                        });
                        this.euiMessageBoxService.openMessageBox(messageBoxConfig);
                    },
                }),
            },
            init: (instances) => {
                componentInstances = instances;

                if (componentInstances.bodyComponent && componentInstances.footerComponent) {
                    if (componentInstances.bodyComponent.form.valid) {
                        componentInstances.footerComponent.isDisabled = false;
                    } else {
                        componentInstances.footerComponent.isDisabled = true;
                    }
                }
            },
        });
        this.euiDialogService.openDialog(config);
    }
}
