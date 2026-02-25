---
description: Basic determinate progress bar with a fixed percentage value.
id: Default
---

```html
<eui-progress-bar [progress]="50" />
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

}
```

