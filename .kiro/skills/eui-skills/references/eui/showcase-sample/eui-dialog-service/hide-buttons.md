---
description: Shows how to hide the accept or dismiss buttons in the default footer.
id: hide-buttons
---

```html
<button euiButton type="button" (click)="openNoDismissButtonWithService()" aria-haspopup="dialog">Open Dialog - No dismiss button</button>&nbsp;
<button euiButton type="button" (click)="openNoAcceptButtonWithService()" aria-haspopup="dialog">Open Dialog - No accept button</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'hide-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HideButtonsComponent {

    private euiDialogService = inject(EuiDialogService);

    public openNoDismissButtonWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasDismissButton: false,
        });

        this.euiDialogService.openDialog(config);
    }

    public openNoAcceptButtonWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasAcceptButton: false,
        });

        this.euiDialogService.openDialog(config);
    }

}
```

