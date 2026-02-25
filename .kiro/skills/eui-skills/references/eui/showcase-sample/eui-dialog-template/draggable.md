---
description: Template-driven dialog opened via ViewChild with dragging enabled.
id: draggable
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog isDraggable [title]="'Dialog title'">
    <p class="eui-u-text-paragraph">Dialog content</p>
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'draggable',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableComponent {

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    public openDialog(): void {
        this.dialog().openDialog();
    }
}
```

