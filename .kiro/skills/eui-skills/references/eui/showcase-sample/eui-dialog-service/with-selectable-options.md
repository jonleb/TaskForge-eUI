---
description: Displays a radio list inside a dialog for single-option selection.
id: with-selectable-options
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { RadioListComponent } from '../../dummy-components/radio-list.component';

@Component({
    selector: 'with-selectable-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithSelectableOptionsComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            height: 'auto',
            width: '15rem',
            bodyComponent: {
                component: RadioListComponent,
            },
        });

        this.euiDialogService.openDialog(config);
    }

}
```

