---
description: Shows BaseStates color variants on timeline items (default, primary, info, success, warning, danger).
id: colors
---

```html
<eui-timeline>
    <eui-timeline-item date="01/01/2021" label="default" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2021" euiPrimary label="primary" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2021" euiInfo label="info" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2021" euiSuccess label="success" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2021" euiWarning label="warning" subLabel="sub label content of the timeline item" />
    <eui-timeline-item date="01/01/2021" euiDanger label="danger" subLabel="sub label content of the timeline item" />
</eui-timeline>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_TIMELINE } from "@eui/components/eui-timeline";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_TIMELINE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
}
```

