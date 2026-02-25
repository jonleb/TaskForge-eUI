---
description: Opens a basic Message Box via the service using a minimal configuration.
id: default
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Message Box</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { EuiMessageBoxService, EuiMessageBoxConfig, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {

    private euiMessageBoxService = inject(EuiMessageBoxService);

    public openWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Message box title',
            content: '<p class="eui-u-text-paragraph">Message box</p>',
            open: () => {
                console.log('open from user config');
            },
            close: () => {
                console.log('close from user config');
            },
            dismiss: () => {
                console.log('dismiss from user config');
            },
            accept: () => {
                console.log('accept from user config');
            },
        });

        this.euiMessageBoxService.openMessageBox(config);
    }
}
```

