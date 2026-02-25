---
description: Demonstrates dialog lifecycle and user-action event callbacks from the service.
id: event-handler
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'event-handler',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON], 
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlerComponent {

    private euiDialogService = inject(EuiDialogService);

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasClosedOnClickOutside: true,
            init: (instances) => {
                console.log('init from user config');
            },
            open: () => {
                console.log('open from user config');
            },
            clickOutside: (instances) => {
                console.log('instances', instances);
                console.log('clickOutside from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
            },
            escape: (instances) => {
                console.log('instances', instances);
                console.log('escape from user config');
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

        this.euiDialogService.openDialog(config);
    }
}
```

