---
description: Shows the completed state indicator on a step using isCompleted.
id: is-completed
---

```html
<eui-wizard>
    <eui-wizard-step label="COMPLETED" isCompleted>
        <p class="eui-u-text-paragraph">Step content...</p>
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'is-completed',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsCompletedComponent {
}
```

