---
description: Shows rectangular skeletons with optional rounded corners.
id: rectangle
---

```html
<div class="doc-sample-section-title">Default</div>
<eui-skeleton rectangle />

<div class="doc-sample-section-title">Rounded</div>
<eui-skeleton rectangle euiRounded />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    selector: 'rectangle',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RectangleComponent {

}
```

