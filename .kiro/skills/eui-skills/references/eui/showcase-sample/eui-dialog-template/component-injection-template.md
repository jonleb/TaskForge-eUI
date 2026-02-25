---
description: Template-driven dialogs opened via ViewChild that inject header/body/footer components.
id: component-injection-template
---

```html
<div class="doc-sample-section-title">Inject component in dialog header</div>
<button euiButton type="button" (click)="openDialog1()" aria-haspopup="dialog">Open Dialog</button>
{{ injectedFormValues1 | json }}

<div class="doc-sample-section-title">Inject component in dialog body and header</div>
<button euiButton type="button" (click)="openDialog2()" aria-haspopup="dialog">Open Dialog</button>
{{ injectedFormValues2 | json }}

<div class="doc-sample-section-title">Inject component in dialog body and footer</div>
<button euiButton type="button" (click)="openDialog3()" aria-haspopup="dialog">Open Dialog</button>
{{ injectedFormValues3 | json }}

<!-- DIALOG TEMPLATES -->
<eui-dialog #dialog1
    [title]="'Dialog title'"
    [isHandleCloseOnAccept]="true"
    [isHandleCloseOnDismiss]="true"
    [isHandleCloseOnEscape]="true"
    (accept)="onAccept1()"
    (dismiss)="onDismiss1()"
    (escape)="onClose1()"
    (dialogClose)="onClose1()">
    <eui-dialog-header>
        @if (dialog1.isOpen) {
            <dummy-header-template-component [actionButtons]="actionButtons" />
        }
    </eui-dialog-header>
    @if (dialog1.isOpen) {
        <dummy-body-template-component #bodyComponent1 (formValueChange)="onFormValueChange1($event)" (closeDialog)="onClose1()" />
    }
</eui-dialog>

<eui-dialog #dialog2
    [title]="'Dialog title'"
    [isHandleCloseOnAccept]="true"
    [isHandleCloseOnClose]="true"
    [isHandleCloseOnEscape]="true"
    (escape)="onClose2()"
    (dialogClose)="onClose2()">
    <eui-dialog-header>
        @if (dialog2.isOpen) {
            <dummy-header-template-component [actionButtons]="actionButtons" />
        }
    </eui-dialog-header>
    @if (dialog2.isOpen) {
        <dummy-body-template-component #bodyComponent2 (formValueChange)="onFormValueChange2($event)" (closeDialog)="onClose2()" />
    }
    <eui-dialog-footer>
        @if (dialog2.isOpen) {
            <dummy-footer-template-component (accept)="onAccept2()" (dismiss)="onDismiss2()" />
        }
    </eui-dialog-footer>
</eui-dialog>

<eui-dialog #dialog3
    [title]="'Dialog title'"
    [isHandleCloseOnAccept]="true"
    [isHandleCloseOnClose]="true"
    [isHandleCloseOnEscape]="true"
    (escape)="onClose3()"
    (dialogClose)="onClose3()">
    @if (dialog3.isOpen) {
        <dummy-body-template-component #bodyComponent3 (formValueChange)="onFormValueChange3($event)" (closeDialog)="onClose3()" />
    }
    <eui-dialog-footer>
        @if (dialog3.isOpen) {
            <dummy-footer-template-component (accept)="onAccept3()" (dismiss)="onDismiss3()" />
        }
    </eui-dialog-footer>
</eui-dialog>
```

```typescript
import { Component, inject, ChangeDetectionStrategy, viewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
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
    selector: 'component-injection-template',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        DummyFooterTemplateComponent,
        DummyBodyTemplateComponent,
        DummyHeaderTemplateComponent,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentInjectionTemplateComponent {

    public actionButtons = ['Action 1', 'Action 2', 'Action 3'];
    public formValues: FormGroup;
    public injectedFormValues1: any;
    public injectedFormValues2: any;
    public injectedFormValues3: any;

    readonly dialog1 = viewChild<EuiDialogComponent>('dialog1');
    readonly dialog2 = viewChild<EuiDialogComponent>('dialog2');
    readonly dialog3 = viewChild<EuiDialogComponent>('dialog3');
    readonly bodyComponent1 = viewChild<DummyBodyTemplateComponent>('bodyComponent1');
    readonly bodyComponent2 = viewChild<DummyBodyTemplateComponent>('bodyComponent2');
    readonly bodyComponent3 = viewChild<DummyBodyTemplateComponent>('bodyComponent3');

    private growlService = inject(EuiGrowlService);

    public openDialog1(): void {
        this.dialog1().openDialog();
    }

    public onClose1(): void {
        console.log('closed');
        this.dialog1().closeDialog();
    }

    public onFormValueChange1(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept1(): void {
        if (this.formValues.valid) {
            this.injectedFormValues1 = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.dialog1().closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
            this.bodyComponent1().checkForm();
        }
    }

    public onDismiss1(): void {
        console.log('dismissed');
        this.dialog1().closeDialog();
    }

    public openDialog2(): void {
        this.dialog2().openDialog();
    }

    public onClose2(): void {
        console.log('closed');
        this.dialog2().closeDialog();
    }

    public onFormValueChange2(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept2(): void {
        if (this.formValues.valid) {
            this.injectedFormValues2 = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.dialog2().closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
            this.bodyComponent2().checkForm();
        }
    }

    public onDismiss2(): void {
        console.log('dismissed');
        this.dialog2().closeDialog();
    }

    public openDialog3(): void {
        this.dialog3().openDialog();
    }

    public onFormValueChange3(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept3(): void {
        if (this.formValues.valid) {
            this.injectedFormValues3 = this.formValues.value;
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
            this.dialog3().closeDialog();
        } else {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
            this.bodyComponent3().checkForm();
        }
    }

    public onDismiss3(): void {
        console.log('dismissed');
        this.dialog3().closeDialog();
    }

    public onClose3(): void {
        console.log('closed');
        this.dialog3().closeDialog();
    }
}
```

