---
description: Template-driven dialog opened via ViewChild presenting an eui-list menu and closing on item click.
id: with-eui-list
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog
    #dialog
    [title]="'Dialog title'"
    [height]="'auto'"
    [width]="'15rem'"
    hasNoBodyPadding
    [hasFooter]="false">
    <ul euiList>
        <li euiListItem euiPrimary (click)="onListItemClicked(1)">
            <eui-icon-svg icon="eui-home" />
            <span euiLabel>Label</span>
            <span euiLabel euiSizeS>Sub-label</span>
        </li>
        <li euiListItem euiSecondary (click)="onListItemClicked(2)">
            <eui-icon-svg icon="eui-home" />
            <span euiLabel>Label</span>
            <span euiLabel euiSizeS>Sub-label</span>
        </li>
        <li euiListItem euiInfo (click)="onListItemClicked(3)">
            <eui-icon-svg icon="eui-home" />
            <span euiLabel>Label</span>
            <span euiLabel euiSizeS>Sub-label</span>
        </li>
        <li euiListItem euiSuccess (click)="onListItemClicked(4)">
            <eui-icon-svg icon="eui-home" />
            <span euiLabel>Label</span>
            <span euiLabel euiSizeS>Sub-label</span>
        </li>
        <li euiListItem euiWarning (click)="onListItemClicked(5)">
            <eui-icon-svg icon="eui-home" />
            <span euiLabel>Label</span>
            <span euiLabel euiSizeS>Sub-label</span>
        </li>
        <li euiListItem euiDanger (click)="onListItemClicked(6)">
            <eui-icon-svg icon="eui-home" />
            <span euiLabel>Label</span>
            <span euiLabel euiSizeS>Sub-label</span>
        </li>
    </ul>
</eui-dialog>
```

```typescript
import { Component, inject, ChangeDetectionStrategy, viewChild } from '@angular/core';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_LIST } from '@eui/components/eui-list';

@Component({
    selector: 'with-eui-list',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_LIST,
    ], 
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithEuiListComponent {
    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    private euiDialogService = inject(EuiDialogService);

    public openDialog(): void {
        this.dialog().openDialog();
    }

    public onListItemClicked(id: number) {
        console.log('onItemClicked()', id);
        this.euiDialogService.closeDialog();
    }
}
```

