---
description: Template-driven dialog opened via ViewChild and aligned to the top using verticalPosition.
id: alignment
---

```html
<button euiButton type="button" (click)="openTop()" aria-haspopup="dialog">Open Dialog (top)</button>

<eui-dialog
    #dialogTop
    [title]="'Dialog (aligned to top)'"
    [verticalPosition]="'top'">
    Dialog content
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'alignment',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignmentComponent {
    readonly dialogTop = viewChild<EuiDialogComponent>('dialogTop');

    public openTop(): void {
        this.dialogTop().openDialog();
    }
}
```

