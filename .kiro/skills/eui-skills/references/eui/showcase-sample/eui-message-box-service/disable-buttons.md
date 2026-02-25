---
description: Opens a service-driven Message Box with either the dismiss or accept button disabled.
id: disable-buttons
---

```html
<button euiButton type="button" (click)="openNoDismissButtonWithService()" aria-haspopup="dialog">Open MessageBox - No dismiss button</button>&nbsp;
<button euiButton type="button" (click)="openNoAcceptButtonWithService()" aria-haspopup="dialog">Open MessageBox - No accept button</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'disable-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisableButtonsComponent {

    private euiMessageBoxService = inject(EuiMessageBoxService);

    public openNoDismissButtonWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasDismissButton: false,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

    public openNoAcceptButtonWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasAcceptButton: false,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

}
```

