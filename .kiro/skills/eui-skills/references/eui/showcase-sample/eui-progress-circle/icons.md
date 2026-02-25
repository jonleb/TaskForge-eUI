---
description: Displays an SVG icon inside the progress circle using the icon input.
id: icons
---

```html
<div class="eui-u-flex eui-u-mt-2xl">
    <eui-progress-circle [value]="25" colorType="info" icon="eui-home" />
    <eui-progress-circle [value]="25" icon="eui-home" />
    <eui-progress-circle [value]="45" colorType="danger" icon="circle-dashed:regular" />
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'icons',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
}
```

