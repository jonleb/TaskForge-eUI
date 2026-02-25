---
description: Template-driven message box with basic title, content, and default accept/dismiss actions opened via ViewChild.
id: default
---

```html
<button euiButton type="button" (click)="openMessageBox()" aria-haspopup="dialog">Open Message Box</button><br/><br/>

<eui-message-box #messageBox
    [title]="'Message box title'"
    (messageBoxClose)="onClose()"
    (messageBoxOpen)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    <div class="eui-u-flex">
        Message box content
    </div>
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

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

