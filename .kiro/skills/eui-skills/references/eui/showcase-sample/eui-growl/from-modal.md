---
description: Opens a dialog that contains a growl sample to show notifications from modal content.
id: from-modal
---

```html
<button euiButton euiPrimary (click)="openDialog()">Open eui-dialog</button>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_GROWL } from "@eui/components/eui-growl";

import { EventsComponent } from "../events/component";

@Component({
    selector: 'fromModal',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_GROWL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromModalComponent {

    private euiDialogService = inject(EuiDialogService);

    public openDialog() {
        const dialog = this.euiDialogService.openDialog(
            new EuiDialogConfig({
                title: 'Dialog title',
                height: '50vh',
                width: '50vw',
                bodyComponent: {
                    component: EventsComponent,
                },
                dismiss: () => {
                    console.log('onDismiss');
                },
                accept: () => {
                    console.log('onAccept');
                },
                close: () => {
                    console.log('onClose');
                },
            }),
        );
    }

}
```

