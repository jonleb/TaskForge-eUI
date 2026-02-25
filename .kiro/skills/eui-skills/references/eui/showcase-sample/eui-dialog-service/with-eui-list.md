---
description: Shows a compact list dialog with no footer and no body padding.
id: with-eui-list
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { ListItemsComponent } from '../../dummy-components/list-items.component';

@Component({
    selector: 'with-eui-list',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithEuiListComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            height: 'auto',
            width: '15rem',
            hasNoBodyPadding: true,
            hasFooter: false,
            bodyComponent: {
                component: ListItemsComponent,
            },
        });

        this.euiDialogService.openDialog(config);
    }

    public onListItemClicked(id: number) {
        console.log('onItemClicked()', id);
        this.euiDialogService.closeDialog();
    }
}
```

