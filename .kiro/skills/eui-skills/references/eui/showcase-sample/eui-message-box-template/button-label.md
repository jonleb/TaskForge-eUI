---
description: Template-driven message box with custom accept and dismiss button labels.
id: button-label
---

```html
<button euiButton type="button" (click)="openMessageBox()" aria-haspopup="dialog">Open Message Box</button>

<eui-message-box #messageBox
    [title]="'Message box title'"
    [acceptLabel]="'YES, delete it'"
    [dismissLabel]="'NO, keep it'"
    (messageBoxClose)="onClose()"
    (messageBoxOpen)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    <p class="eui-u-text-paragraph">Message box content</p>
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild, inject } from '@angular/core';

import {
    EuiMessageBoxComponent,
    EUI_MESSAGE_BOX,
    EuiMessageBoxService,
} from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'button-label',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],  
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLabelComponent {
    private euiMessageBoxService = inject(EuiMessageBoxService);


    readonly messageBox = viewChild<EuiMessageBoxComponent>('messageBox');

    public openMessageBox(): void {
        this.messageBox().openMessageBox();
    }

    public onClose(): void {
        console.log('close from output');
    }

    public onOpen(): void {
        console.log('open from output');
    }

    public onAccept(): void {
        console.log('accept from output');
    }

    public onDismiss(): void {
        console.log('dismiss from output');
    }
}
```

