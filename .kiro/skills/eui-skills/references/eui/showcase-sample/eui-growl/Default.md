---
description: Basic growl notifications triggered via the service for the four severity types, using default life and position.
id: Default
---

```html
<button euiButton euiInfo euiSizeS (click)="showGrowl('info')">Info growl</button>&nbsp;
<button euiButton euiSuccess euiSizeS (click)="showGrowl('success')">Success growl</button>&nbsp;
<button euiButton euiWarning euiSizeS (click)="showGrowl('warning')">Warning growl</button>&nbsp;
<button euiButton euiDanger euiSizeS (click)="showGrowl('danger')">Danger growl</button>&nbsp;
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { EuiGrowlService } from '@eui/core';

import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    summaryTitle = 'Summary title';

    private euiGrowlService = inject(EuiGrowlService);

    public showGrowl(type: string, summary?: string, inputMessage: string = 'Message details') {
        if (!type) {
            type = 'info';
        }
        this.euiGrowlService.growl({
            severity: type,
            summary: summary || this.summaryTitle,
            detail: inputMessage },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }
}
```

