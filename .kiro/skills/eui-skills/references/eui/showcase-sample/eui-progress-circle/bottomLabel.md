---
description: Places the label below the circle with hasBottomLabel, suited for longer text.
id: bottomLabel
---

```html
<div class="eui-u-flex">
    <eui-progress-circle [value]="0" euiSizeS hasBottomLabel valueLabel="Label" />
    <eui-progress-circle [value]="50" hasBottomLabel valueLabel="This is a long text label under the progress circle" />
    <eui-progress-circle [value]="75" hasBottomLabel euiSizeL valueLabel="This is a long text label under the progress circle" />
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'bottomLabel',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomLabelComponent {

}
```

