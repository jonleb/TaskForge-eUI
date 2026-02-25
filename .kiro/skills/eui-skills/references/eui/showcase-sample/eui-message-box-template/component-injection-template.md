---
description: Template-driven message box injecting body and footer components to compose rich content and actions.
id: component-injection-template
---

```html
<button euiButton type="button" (click)="openMessageBox()" aria-haspopup="dialog">Open Message Box</button>

<eui-message-box #messageBox [title]="'Message box title'" [isHandleCloseOnAccept]="true" [isHandleCloseOnClose]="true" (messageBoxClose)="onClose()">
    <dummy-body-template-component #bodyComponent (formValueChange)="onFormValueChange($event)" (closeDialog)="onClose()" (closeModal)="onClose()" />
    <eui-message-box-footer>
        <dummy-footer-template-component #bodyComponent (accept)="onAccept()" (dismiss)="onDismiss()" />
    </eui-message-box-footer>
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from '@eui/components/eui-message-box';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { DummyBodyTemplateComponent } from '../../dummy-components/dummy-body-template-component';
import { DummyFooterTemplateComponent } from '../../dummy-components/dummy-footer-template-component';

@Component({
    selector: 'component-injection-template',
    templateUrl: 'component.html',
    imports: [
        EUI_MESSAGE_BOX,
        ...EUI_BUTTON,
        DummyBodyTemplateComponent,
        DummyFooterTemplateComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentInjectionTemplateComponent {

    public formValues: FormGroup;

    readonly messageBox = viewChild<EuiMessageBoxComponent>('messageBox');
    readonly bodyComponent = viewChild<DummyBodyTemplateComponent>('bodyComponent');

    public openMessageBox(): void {
        this.messageBox().openMessageBox();
    }

    public onFormValueChange(form: FormGroup): void {
        this.formValues = form;
    }

    public onAccept(): void {
        console.log(this.formValues);
        if (this.formValues.valid) {
            alert('Form valid');
            this.bodyComponent().resetForm();
            this.messageBox().closeMessageBox();
        } else {
            this.bodyComponent().checkForm();
        }
    }

    public onDismiss(): void {
        console.log('dismissed');
        this.bodyComponent().resetForm();
        this.messageBox().closeMessageBox();
    }

    public onClose(): void {
        console.log('closed');
        this.bodyComponent().resetForm();
        this.messageBox().closeMessageBox();
    }
}
```

