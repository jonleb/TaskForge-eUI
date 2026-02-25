---
description: Enables draggable behavior for a Message Box opened via the service.
id: draggable
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Message Box</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'draggable',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableComponent {

    private euiMessageBoxService = inject(EuiMessageBoxService);

    public openWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            isDraggable: true,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

}
```

