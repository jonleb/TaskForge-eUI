---
description: Opens a dialog without the footer section.
id: no-footer
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'no-footer',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoFooterComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasFooter: false,
        });

        this.euiDialogService.openDialog(config);
    }

}
```

