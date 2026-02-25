---
description: Template-driven dialog opened via ViewChild that chains dialogs and a message box in a multi-step flow.
id: multiple-dialog-template
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>
{{ injectedFormValues | json }}

<eui-dialog #dialog
    [title]="'Dialog title Dialog1TemplateComponent'"
    [isHandleCloseOnAccept]="true"
    [isHandleCloseOnDismiss]="true"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    @if (dialog.isOpen) {
        <dialog1-template-component #dialogContentComponent (formValueChange)="onFormValueChange($event)" />
    }
</eui-dialog>

<eui-message-box #messageBox
    [isHandleCloseOnAccept]="true"
    [title]="'Message box title'"
    (accept)="onMessageBoxAccept()">
    <div class="eui-u-flex">
        <p class="eui-u-text-paragraph">Are you sure to cancel the form</p>
    </div>
</eui-message-box>
```

```typescript
import { Component, inject, ChangeDetectionStrategy, viewChild } from "@angular/core";
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDialogTemplateComponent {

    public formValues: FormGroup;
    public injectedFormValues: any;

    readonly dialog = viewChild<EuiDialogComponent>('dialog');
    readonly messageBox = viewChild<EuiMessageBoxComponent>('messageBox');
    readonly dialogContentComponent = viewChild<Dialog1TemplateComponent>('dialogContentComponent');

    private growlService = inject(EuiGrowlService);
    private euiDialogService = inject(EuiDialogService);

    public openDialog(): void {
        const dialog = this.dialog().openDialog();
    }

    public onAccept(): void {
        this.dialogContentComponent().checkForm();
        if (this.formValues.valid) {
            this.injectedFormValues = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.euiDialogService.closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        }
    }

    public onDismiss(): void {
        this.messageBox().openMessageBox();
    }

    public onFormValueChange(form: FormGroup): void {
        this.formValues = form;
    }

    public onMessageBoxAccept(): void {
        this.messageBox().closeMessageBox();
        this.dialog().closeDialog();
    }
}
```

