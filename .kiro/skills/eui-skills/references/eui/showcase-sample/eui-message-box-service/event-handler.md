---
description: Logs lifecycle and action events from a Message Box opened via the service.
id: event-handler
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Message Box</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'event-handler',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventHandlerComponent {

    private euiMessageBoxService = inject(EuiMessageBoxService);

    public openWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Message Box title',
            content: 'Message Box content',
            init: (instances) => {
                console.log('init from user config');
            },
            open: () => {
                console.log('open from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
            },
            dismiss: (instances) => {
                console.log('instances', instances);
                console.log('dismiss from user config');
            },
            accept: (instances) => {
                console.log('instances', instances);
                console.log('accept from user config');
            },
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

}
```

