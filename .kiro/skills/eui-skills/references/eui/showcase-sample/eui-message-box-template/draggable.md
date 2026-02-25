---
description: Template-driven message box with draggable behavior enabled.
id: draggable
---

```html
<button euiButton type="button" (click)="openMessageBox()" aria-haspopup="dialog">Open Message Box</button>

<eui-message-box #messageBox isDraggable [title]="'Message Box title'">
    <p class="eui-u-text-paragraph">Message Box content</p>
</eui-message-box>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'draggable',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableComponent {

    readonly messageBox = viewChild<EuiMessageBoxComponent>('messageBox');

    public openMessageBox(): void {
        this.messageBox().openMessageBox();
    }
}
```

