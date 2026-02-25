import { Component, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EuiAppShellService } from '@eui/core';
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_AUTOCOMPLETE } from "@eui/components/eui-autocomplete";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LIST } from "@eui/components/eui-list";

import { DummyBodyTemplateComponent } from '../../dummy-components/dummy-body-template-component';
import { DummyHeaderTemplateComponent } from "../../dummy-components/dummy-header-template-component";
import { DummyFooterTemplateComponent } from "../../dummy-components/dummy-footer-template-component";

@Component({
    // eslint-disable-next-line
    selector: 'component-injection-template',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
        ...EUI_DIALOG,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LIST,
        DummyFooterTemplateComponent,
        DummyBodyTemplateComponent,
        DummyHeaderTemplateComponent,
        JsonPipe,
    ], 
})
export class ComponentInjectionTemplateComponent {

    public actionButtons = ['Action 1', 'Action 2', 'Action 3'];
    public formValues: FormGroup;
    public injectedFormValues1: any;
    public injectedFormValues2: any;
    public injectedFormValues3: any;

    @ViewChild('dialog1') dialog1: EuiDialogComponent;
    @ViewChild('dialog2') dialog2: EuiDialogComponent;
    @ViewChild('dialog3') dialog3: EuiDialogComponent;
    @ViewChild('bodyComponent1') bodyComponent1: DummyBodyTemplateComponent;
    @ViewChild('bodyComponent2') bodyComponent2: DummyBodyTemplateComponent;
    @ViewChild('bodyComponent3') bodyComponent3: DummyBodyTemplateComponent;

    constructor(private asService: EuiAppShellService, public growlService: EuiGrowlService,) {}

    public openDialog1(): void {
        this.dialog1.openDialog();
    }

    public onClose1(): void {
        console.log('closed');
        this.dialog1.closeDialog();
    }

    public onFormValueChange1(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept1(): void {
        if (this.formValues.valid) {
            this.injectedFormValues1 = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.dialog1.closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
            this.bodyComponent1.checkForm();
        }
    }

    public onDismiss1(): void {
        console.log('dismissed');
        this.dialog1.closeDialog();
    }

    public openDialog2(): void {
        this.dialog2.openDialog();
    }

    public onClose2(): void {
        console.log('closed');
        this.dialog2.closeDialog();
    }

    public onFormValueChange2(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept2(): void {
        if (this.formValues.valid) {
            this.injectedFormValues2 = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.dialog2.closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
            this.bodyComponent2.checkForm();
        }
    }

    public onDismiss2(): void {
        console.log('dismissed');
        this.dialog2.closeDialog();
    }

    public openDialog3(): void {
        this.dialog3.openDialog();
    }

    public onFormValueChange3(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept3(): void {
        if (this.formValues.valid) {
            this.injectedFormValues3 = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.dialog3.closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
            this.bodyComponent3.checkForm();
        }
    }

    public onDismiss3(): void {
        console.log('dismissed');
        this.dialog3.closeDialog();
    }

    public onClose3(): void {
        console.log('closed');
        this.dialog3.closeDialog();
    }
}
