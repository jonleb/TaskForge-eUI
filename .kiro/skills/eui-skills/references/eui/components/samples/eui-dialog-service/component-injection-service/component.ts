import { Component, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from '@angular/common';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_AUTOCOMPLETE } from "@eui/components/eui-autocomplete";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LIST } from "@eui/components/eui-list";

import { DummyBodyServiceComponent, DummyBodyComponentConfig } from '../../dummy-components/dummy-body-service-component';
import { DummyFooterServiceComponent, DummyFooterComponentConfig } from '../../dummy-components/dummy-footer-service-component';
import { DummyHeaderServiceComponent, DummyHeaderComponentConfig } from '../../dummy-components/dummy-header-service-component';

@Component({
    // eslint-disable-next-line
    selector: 'component-injection-service',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_ALERT,
        ...EUI_DROPDOWN,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_GROUP,
        ...EUI_ICON,
        ...EUI_LIST,
        ...EUI_DIALOG,
        JsonPipe,
    ],
})
export class ComponentInjectionServiceComponent {

    public actionButtons = ['Action 1', 'Action 2', 'Action 3'];
    public formValues: FormGroup;
    public injectedFormValues1: any;
    public injectedFormValues2: any;
    public injectedFormValues3: any;

    @ViewChild('dialog1') dialog1: EuiDialogComponent;
    @ViewChild('dialog2') dialog2: EuiDialogComponent;
    @ViewChild('dialog3') dialog3: EuiDialogComponent;

    constructor(private euiDialogService: EuiDialogService, public growlService: EuiGrowlService) {}

    public closeMessageBox(): void {
        this.euiDialogService.closeDialog();
    }

    public openWithService1(): void {
        let componentForm: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            isHandleCloseOnAccept: true,
            headerComponent: {
                component: DummyHeaderServiceComponent,
                config: new DummyHeaderComponentConfig({
                    actionButtons: ['Action 1', 'Action 2', 'Action 3'],
                }),
            },
            bodyComponent: {
                component: DummyBodyServiceComponent,
                config: new DummyBodyComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;
                    },
                }),
            },
            clickOutside: (instances) => {
                console.log('instances', instances);
                console.log('clickOutside from user config');
            },
            open: () => {
                console.log('open from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
            },
            dismiss: (instances) => {
                console.log('instances', instances);
                console.log('dismiss from user config');
            },
            accept: (instances) => {
                instances.bodyComponent.checkForm();
                if (componentForm.valid) {
                    this.injectedFormValues1 = componentForm.value;
                    this.growlService.growl({
                        severity: 'success',
                        summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.',
                    });
                    this.euiDialogService.closeDialog();
                } else {
                    this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
                }
            },
        });

        this.euiDialogService.openDialog(config);
    }

    public openWithService2(): void {
        let componentForm: FormGroup;
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            isHandleCloseOnAccept: true,
            isHandleCloseOnClose: true,
            hasClosedOnClickOutside: true,
            bodyComponent: {
                component: DummyBodyServiceComponent,
                config: new DummyBodyComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;
                    },
                }),
            },
            clickOutside: (instances) => {
                // console.log('instances', instances);
                // console.log('clickOutside from user config');
            },
            open: () => {
                // console.log('open from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
                this.euiDialogService.closeDialog();
            },
            dismiss: (instances) => {
                // console.log('instances', instances);
                // console.log('dismiss from user config');
            },
            accept: (instances) => {
                instances.bodyComponent.checkForm();
                if (componentForm.valid) {
                    this.injectedFormValues2 = componentForm.value;
                    this.growlService.growl({
                        severity: 'success',
                        summary: 'SUBMIT SUCCESS',
                        detail: 'The Form has been successfully submitted.',
                    });
                    this.euiDialogService.closeDialog();
                } else {
                    this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
                }
            },
        });

        this.euiDialogService.openDialog(config);
    }

    public openWithService3(): void {
        let componentForm: FormGroup;
        let componentInstances: any;
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: DummyBodyServiceComponent,
                config: new DummyBodyComponentConfig({
                    onFormValueChange: (form: FormGroup) => {
                        componentForm = form;
                    },
                }),
            },
            footerComponent: {
                component: DummyFooterServiceComponent,
                config: new DummyFooterComponentConfig({
                    accept: () => {
                        componentInstances.bodyComponent.checkForm();

                        if (componentForm.valid) {
                            this.injectedFormValues3 = componentForm.value;
                            this.growlService.growl({
                                severity: 'success',
                                summary: 'SUBMIT SUCCESS',
                                detail: 'The Form has been successfully submitted.',
                            });
                            this.euiDialogService.closeDialog();
                        } else {
                            this.growlService.growl({
                                severity: 'danger',
                                summary: 'SUBMIT FAILED!',
                                detail: 'Please fill in all required fields !',
                            });
                        }
                    },
                    dismiss: () => {
                        this.euiDialogService.closeDialog();
                    },
                }),
            },
            init: (instances) => {
                componentInstances = instances;
            },
            clickOutside: (instances) => {
                console.log('instances', instances);
                console.log('clickOutside from user config');
            },
            open: () => {
                console.log('open from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
            },
        });

        this.euiDialogService.openDialog(config);
    }
}
