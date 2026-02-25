import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from '@eui/components/eui-message-box';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { DummyBodyTemplateComponent } from '../../dummy-components/dummy-body-template-component';
import { DummyFooterTemplateComponent } from '../../dummy-components/dummy-footer-template-component';

@Component({
    // eslint-disable-next-line
    selector: 'component-injection-template',
    templateUrl: 'component.html',
    imports: [
        EUI_MESSAGE_BOX,
        ...EUI_BUTTON,
        DummyBodyTemplateComponent,
        DummyFooterTemplateComponent,
    ],    
})
export class ComponentInjectionTemplateComponent {

    public formValues: FormGroup;

    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;
    @ViewChild('bodyComponent') bodyComponent: DummyBodyTemplateComponent;

    public openMessageBox(): void {
        this.messageBox.openMessageBox();
    }

    public onFormValueChange(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept(): void {
        console.log(this.formValues);
        if (this.formValues.valid) {
            alert('Form valid');
            this.bodyComponent.resetForm();
            this.messageBox.closeMessageBox();
        } else {
            this.bodyComponent.checkForm();
        }
    }

    public onDismiss(): void {
        console.log('dismissed');
        this.bodyComponent.resetForm();
        this.messageBox.closeMessageBox();
    }

    public onClose(): void {
        console.log('closed');
        this.bodyComponent.resetForm();
        this.messageBox.closeMessageBox();
    }
}
