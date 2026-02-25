---
description: Template-driven message box wiring open, close, accept, and dismiss outputs for event handling.
id: event-handler
---

```html
<button euiButton type="button" (click)="openMessageBox()" aria-haspopup="dialog">Open Message Box</button>

<eui-message-box #messageBox
    [title]="'Message Box title'"
    (messageBoxClose)="onClose()"
    (messageBoxOpen)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    <div class="eui-u-flex">
        Message Box content...
    </div>
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'event-handler',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlerComponent {

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

    public onClick(value: boolean): void {
        console.log('click from output: ' + value);
    }
}
```

