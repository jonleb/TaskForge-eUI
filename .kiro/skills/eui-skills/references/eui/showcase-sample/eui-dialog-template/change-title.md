---
description: Template-driven dialog opened via ViewChild with the title bound to an observable for runtime updates.
id: change-title
---

```html
<button euiButton type="button" (click)="openDialog()">Open Dialog</button>
<div class="eui-u-flex eui-u-mt-m">
    <button euiButton type="button" (click)="changeDialogTitle('Title 1')">Set title header to 'Title 1'</button>
    <button euiButton type="button" class="eui-u-ml-s" (click)="changeDialogTitle('Title 2')">Set title header to 'Title 2'</button>
</div>

<eui-dialog #dialog [title]="dialogTitle$ | async">
    <eui-showcase-doc-lorem-ipsum [textSize]="'small'" />
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { EUI_DIALOG, EuiDialogComponent } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    selector: 'change-title',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_SHOWCASE,
        AsyncPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeTitleComponent {
    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    dialogTitle$ = of('Title 1');

    public openDialog(): void {
        this.dialog().openDialog();
    }

    public changeDialogTitle(title: string) {
        this.dialogTitle$ = of(title);
    }
}
```

