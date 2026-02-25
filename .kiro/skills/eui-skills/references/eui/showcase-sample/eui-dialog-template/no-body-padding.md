---
description: Template-driven dialog opened via ViewChild with hasNoBodyPadding to render edge-to-edge content.
id: no-body-padding
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog [title]="dialogTitle" hasNoBodyPadding>
    {{ dialogContent }}
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'no-body-padding',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON], 
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoBodyPaddingComponent {
    public dialogTitle = 'Dialog window title';
    public dialogContent = 'Dialog content with no padding option enabled...';
    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    public openDialog(): void {
        this.dialog().openDialog();
    }
}
```

