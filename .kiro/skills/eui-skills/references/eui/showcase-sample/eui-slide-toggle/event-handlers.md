---
description: Handles the slideToggleChange event and reflects the value.
id: event-handlers
---

```html
<eui-slide-toggle (slideToggleChange)="onChange($event)" /><br/>
Value: {{ value }}
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlersComponent {

    public value = false;

    public onChange(e: boolean) {
        this.value = e;
    }
}
```

