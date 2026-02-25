---
description: Template-driven dialog opened via ViewChild with the footer removed.
id: no-footer
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog
    [title]="'Dialog title'"
    [hasFooter]="false">
    Dialog content
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'no-footer',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoFooterComponent {

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    public openDialog(): void {
        this.dialog().openDialog();
    }

}
```

