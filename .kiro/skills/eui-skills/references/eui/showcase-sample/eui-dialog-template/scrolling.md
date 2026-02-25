---
description: Template-driven dialog opened via ViewChild with constrained height to demonstrate internal scrolling.
id: scrolling
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog [title]="'Dialog title'" [height]="'30vh'">
    @if (dialog.isOpen) {
        <eui-showcase-doc-lorem-ipsum [textSize]="'large'" />
    }
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_SHOWCASE } from "@eui/showcase";
import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'scrolling',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_DIALOG, ...EUI_SHOWCASE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollingComponent {

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    public openDialog(): void {
        this.dialog().openDialog();
    }
}
```

