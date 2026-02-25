---
description: Triggers a growl with a click callback to illustrate the growl click event and callback handler.
id: events
---

```html
<button euiButton euiInfo (click)="showGrowlCallback('info')">
    Show info growl message and click on it to execute the callback
</button>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { EuiGrowlService } from '@eui/core';

import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_GROWL } from "@eui/components/eui-growl";

@Component({
    selector: 'events',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_GROWL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {

    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    messageDetail = 'Message details';

    private growlService = inject(EuiGrowlService);

    showGrowlCallback(type: string, inputMessage?: string) {
        if (!type) {
            type = 'info';
        }
        this.growlService.growl({
            severity: type,
            summary: 'summary title',
            detail: inputMessage || this.messageDetail },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
            () => {
                alert('This is a click callback');
            },
        );
    }
}
```

