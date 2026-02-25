---
description: Left-aligned timeline layout where all items align on the left side.
id: isLeftAligned
---

```html
<eui-timeline isLeftAligned>
    <eui-timeline-item date="01/01/2021" label="default" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2020" euiPrimary label="primary" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2020" euiInfo label="info" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2020" euiSuccess label="success" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2020" euiWarning label="warning" subLabel="sub label content of the timeline item" />
    <eui-timeline-item isGroup date="01/01/2020" label="group step" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2020" euiDanger label="danger" subLabel="sub label content of the timeline item" />
</eui-timeline>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_TIMELINE } from "@eui/components/eui-timeline";

@Component({
    selector: 'isLeftAligned',
    templateUrl: 'component.html',
    imports: [...EUI_TIMELINE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsLeftAlignedComponent {
}
```

