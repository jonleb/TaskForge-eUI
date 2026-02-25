---
description: Template-driven dialog opened via ViewChild that hosts overlay components such as eui-autocomplete and eui-popover.
id: with-overlay-component
---

```html
<button euiButton type="button" (click)="openDialog()">Open Dialog</button>

<eui-dialog #dialog [title]="'Dialog title'">
    <eui-showcase-doc-lorem-ipsum [textSize]="'small'" />
    <eui-autocomplete [autocompleteData]="autocompleteData" />
    <eui-showcase-doc-lorem-ipsum [textSize]="'small'" />
    <button
        euiButton
        euiRounded
        euiBasicButton
        euiIconButton
        euiSizeS
        aria-label="Popover Icon Button"
        (click)="openPopover($event)">
        <eui-icon-svg icon="eui-circle-fill" />
    </button>
    <eui-popover #popover [title]="'This is popover title'">
        <ul class="example-list">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </eui-popover>
    <eui-showcase-doc-lorem-ipsum [textSize]="'large'" />
</eui-dialog>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';

import { EUI_DIALOG, EuiDialogComponent } from '@eui/components/eui-dialog';
import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_POPOVER, EuiPopoverComponent } from '@eui/components/eui-popover';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    selector: 'with-overlay-component',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_POPOVER,
        ...EUI_ICON,
        ...EUI_SHOWCASE,
        ...EUI_AUTOCOMPLETE,
    ], 
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithOverlayComponentComponent {
    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
    ];

    readonly dialog = viewChild<EuiDialogComponent>('dialog');
    readonly popover = viewChild<EuiPopoverComponent>('popover');

    public openDialog(): void {
        this.dialog().openDialog();
    }

    public openPopover(e: any) {
        this.popover().openPopover(e.target);
    }
}
```

