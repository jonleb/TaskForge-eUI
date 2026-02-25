---
description: Enables drag-and-drop to reposition the dialog.
id: draggable
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'draggable',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            isDraggable: true,
        });

        this.euiDialogService.openDialog(config);
    }

}
```

