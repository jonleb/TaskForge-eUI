---
description: Template-driven dialog opened via ViewChild demonstrating classList styling and dialog events.
id: classlist
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog
    [title]="'Dialog title'"
    [classList]="'eui-u-width-20'"
    (clickOutside)="onClickOutside()"
    (close)="onClose()"
    (open)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    Dialog content
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'classlist',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClasslistComponent {

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    public openDialog(): void {
        this.dialog().openDialog();
    }

    public onClickOutside(): void {
        console.log('clickOutside from output');
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

