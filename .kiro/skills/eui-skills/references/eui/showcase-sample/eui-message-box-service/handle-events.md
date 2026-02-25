---
description: Shows manual close handling for dismiss, close, and accept when the Message Box is opened via the service.
id: handle-events
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Message Box</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'handle-events',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandleEventsComponent {

    private euiMessageBoxService = inject(EuiMessageBoxService);

    public openWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Message Box title',
            content: 'Message Box content',
            isHandleCloseOnDismiss: true,
            isHandleCloseOnClose: true,
            isHandleCloseOnAccept: true,
            open: () => {
                console.log('open from user config');
            },
            close: (instances) => {
                console.log('close from user config');
                this.euiMessageBoxService.closeMessageBox();
            },
            dismiss: (instances) => {
                console.log('dismiss from user config');
                this.euiMessageBoxService.closeMessageBox();
            },
            accept: (instances) => {
                console.log('accept from user config');
                this.euiMessageBoxService.closeMessageBox();
            },
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

}
```

