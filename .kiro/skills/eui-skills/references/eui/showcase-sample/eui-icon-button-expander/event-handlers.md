---
description: Demonstrates the buttonClick event by toggling isExpanded and displaying the current state.
id: event-handlers
---

```html
<eui-icon-button-expander [isExpanded]="isExpanded" isDirectionForward (buttonClick)="onToggle()"/>
<br>
Expanded : {{ isExpanded }}
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON_EXPANDER } from '@eui/components/eui-icon-button-expander';

@Component({
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON_EXPANDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlersComponent {
    isExpanded = false;

    onToggle(): void {
        this.isExpanded = !this.isExpanded;
    }

}
```

