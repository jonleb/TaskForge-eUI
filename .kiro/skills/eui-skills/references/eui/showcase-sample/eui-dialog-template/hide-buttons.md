---
description: Template-driven dialogs opened via ViewChild showing how to hide dismiss or accept buttons.
id: hide-buttons
---

```html
<button euiButton type="button" (click)="openDialogNoDismissButton()" aria-haspopup="dialog">Open Dialog - No dismiss button</button>&nbsp;
<button euiButton type="button" (click)="openDialogNoAcceptButton()" aria-haspopup="dialog">Open Dialog - No accept button</button>

<eui-dialog #dialogNoDismissButton [title]="'Dialog title'" [hasDismissButton]="false">
    <p class="eui-u-text-paragraph">Dialog content</p>
</eui-dialog>

<eui-dialog #dialogNoAcceptButton [title]="'Dialog title'" [hasAcceptButton]="false">
    <p class="eui-u-text-paragraph">Dialog content</p>
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'hide-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HideButtonsComponent {

    readonly dialogNoDismissButton = viewChild<EuiDialogComponent>('dialogNoDismissButton');
    readonly dialogNoAcceptButton = viewChild<EuiDialogComponent>('dialogNoAcceptButton');

    public openDialogNoDismissButton(): void {
        this.dialogNoDismissButton().openDialog();
    }

    public openDialogNoAcceptButton(): void {
        this.dialogNoAcceptButton().openDialog();
    }

}
```

