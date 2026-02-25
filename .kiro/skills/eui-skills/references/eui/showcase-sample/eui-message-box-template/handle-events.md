---
description: Template-driven message box with manual close control using isHandleCloseOn* inputs and explicit closeMessageBox calls.
id: handle-events
---

```html
<button euiButton type="button" (click)="openMessageBox()" aria-haspopup="dialog">Open Message Box</button>

<eui-message-box #messageBox
    [title]="'Message Box title'"
    [isHandleCloseOnDismiss]="true"
    [isHandleCloseOnClose]="true"
    [isHandleCloseOnAccept]="true"
    (messageBoxClose)="onClose()"
    (messageBoxOpen)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    <p class="eui-u-text-paragraph">Message box content</p>
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'handle-events',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandleEventsComponent {

    readonly messageBox = viewChild<EuiMessageBoxComponent>('messageBox');

    public openMessageBox(): void {
        this.messageBox().openMessageBox();
    }

    public onClose(): void {
        console.log('close from output');
        this.messageBox().closeMessageBox();
    }

    public onOpen(): void {
        console.log('open from output');
    }

    public onAccept(): void {
        console.log('accept from output');
        this.messageBox().closeMessageBox();
    }

    public onDismiss(): void {
        console.log('dismiss from output');
        this.messageBox().closeMessageBox();
    }
}
```

