---
description: Removes default body padding for edge-to-edge content.
id: no-body-padding
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'no-body-padding',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoBodyPaddingComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog window title',
            content: 'Dialog content with no padding option enabled...',
            hasNoBodyPadding: true,
        });

        this.euiDialogService.openDialog(config);
    }

}
```

