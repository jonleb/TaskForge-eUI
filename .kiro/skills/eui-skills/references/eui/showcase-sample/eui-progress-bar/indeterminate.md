---
description: Indeterminate mode for unknown duration tasks, showing a continuous animation.
id: indeterminate
---

```html
<eui-progress-bar label="Import items" isIndeterminate />
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";

@Component({
    selector: 'indeterminate',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndeterminateComponent {

}
```

