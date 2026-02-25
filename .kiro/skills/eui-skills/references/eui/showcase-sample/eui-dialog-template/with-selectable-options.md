---
description: Template-driven dialog opened via ViewChild showing selectable radio options in a compact layout.
id: with-selectable-options
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog
    #dialog
    [title]="'Dialog title'"
    [height]="'auto'"
    [width]="'15rem'">
    <div class="eui-u-flex eui-u-flex-column">
        @for (option of options; track option) {
            <div>
                <input
                    euiInputRadio
                    aria-label="default unchecked"
                    name="option"
                    [id]="'item-' + option.id"
                    [value]="option.value"
                    (click)="onItemClicked(option.id)" />
                <label for="item-{{ option.id }}">{{ option.value }}</label>
            </div>
        }
    </div>
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';

import { EUI_DIALOG, EuiDialogComponent } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';

@Component({
    selector: 'with-selectable-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_INPUT_RADIO,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithSelectableOptionsComponent {
    public options = [
        { id: 1, value: 'Item 1' },
        { id: 2, value: 'Item 2' },
        { id: 3, value: 'Item 3' },
        { id: 4, value: 'Item 4' },
        { id: 5, value: 'Item 5' },
        { id: 6, value: 'Item 6' },
        { id: 7, value: 'Item 7' },
        { id: 8, value: 'Item 8' },
        { id: 9, value: 'Item 9' },
    ];

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    public openDialog(): void {
        this.dialog().openDialog();
    }

    public onItemClicked(id: number): void {
        console.log('onItemClicked()', id);
    }
}
```

