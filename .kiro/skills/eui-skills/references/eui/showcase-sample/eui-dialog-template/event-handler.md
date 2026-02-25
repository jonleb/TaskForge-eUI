---
description: Template-driven dialog opened via ViewChild illustrating output events such as open, close, accept, dismiss, escape, and clickOutside.
id: event-handler
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog
    [title]="'Dialog title'"
    [hasClosedOnClickOutside]="true"
    (clickOutside)="onClickOutside()"
    (dialogClose)="onClose()"
    (escape)="onEscape()"
    (dialogOpen)="onOpen()"
    (accept)="onAccept()"
    (dismiss)="onDismiss()">
    <div class="eui-u-flex">
        Dialog content...
    </div>
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'event-handler',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlerComponent {

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

    public onEscape(): void {
        console.log('escape from output');
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

    public onClick(value: boolean): void {
        console.log('click from output: ' + value);
    }
}
```

