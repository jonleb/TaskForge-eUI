---
description: Basic timeline with items using date, time, label, and subLabel.
id: Default
---

```html
<eui-timeline>
    <eui-timeline-item date="01/03/2021"
        time="12:00"
        label="default"
        subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/02/2021"
        time="12:00"
        label="default"
        subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2021"
        time="12:00"
        label="default"
        subLabel="sub label content of the timeline item" />
</eui-timeline>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_TIMELINE } from "@eui/components/eui-timeline";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_TIMELINE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

