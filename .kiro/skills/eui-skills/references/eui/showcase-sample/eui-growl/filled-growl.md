---
description: Shows the filled variant of growl messages for each severity.
id: filled-growl
---

```html
<button euiButton euiInfo (click)="showGrowlFilled('info')">Info growl</button>&nbsp;
<button euiButton euiSuccess (click)="showGrowlFilled('success')">Success growl</button>&nbsp;
<button euiButton euiWarning (click)="showGrowlFilled('warning')">Warning growl</button>&nbsp;
<button euiButton euiDanger (click)="showGrowlFilled('danger')">Danger growl</button>&nbsp;
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { EuiGrowlService } from '@eui/core';

import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'filled-growl',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilledGrowlComponent {

    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    summaryTitle = 'Summary title';

    private euiGrowlService = inject(EuiGrowlService);

    public showGrowlFilled(type: string, summary?: string, inputMessage: string = 'Message details') {
        if (!type) {
            type = 'info';
        }
        this.euiGrowlService.growl(
            {
                severity: type,
                summary: summary || this.summaryTitle,
                detail: inputMessage,
                filled: true
            },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }

}
```

